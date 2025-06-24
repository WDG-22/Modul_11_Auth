import express from "express";
import chalk from "chalk";
import cors from "cors";
import { OpenAI } from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const ai = new OpenAI({
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
	baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Running" });
});

app.post("/messages", async (req, res) => {
	const { prompt } = req.body;
	const result = await ai.chat.completions.create({
		model: "gemini-2.0-flash-lite",
		messages: [
			// {
			// 	role: "system",
			// 	content:
			// 		"You are a Senior software developer. When asked about coding related questions, you never answer with concrete code, but with higher level concepts. ",
			// },
			{ role: "user", content: prompt },
		],
		// max_completion_tokens: 150,
	});

	res.json({ result: result.choices[0].message.content });
});

app.post("/messages/stream", async (req, res) => {
	const { prompt } = req.body;

	const result = await ai.chat.completions.create({
		model: "gemini-2.0-flash-lite",
		messages: [
			{ role: "system", content: "You are a Senior Web Developer." },
			{ role: "user", content: prompt },
		],
		stream: true,
		// max_completion_tokens: 100,
	});

	// let content = "";

	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	});

	for await (const chunk of result) {
		// content += chunk.choices[0].delta.content;
		const text = chunk.choices[0].delta.content;
		const jsonString = JSON.stringify(text);

		res.write(`data: ${jsonString}\n\n`);
	}

	res.end();
	res.on("close", () => res.end());
});

app.get("/models", async (req, res) => {
	const list = await ai.models.list();
	const models = [];
	for await (const model of list) {
		console.log(model);
		models.push(model);
	}

	res.json({ models });
});

app.post("/images", async (req, res) => {
	const { prompt } = req.body;

	const image = await ai.images.generate({
		model: "imagen-3.0-generate-002",
		prompt,
		response_format: "b64_json",
		n: 1,
	});

	res.json({ image });
});

const Recipe = z.object({
	title: z.string(),
	ingredients: z.array(
		z.object({
			name: z.string(),
			quantity: z.string(),
			estimated_cost_per_unit: z.number(),
		}),
	),
	preparation_description: z.string(),
	time_in_min: z.number(),
});

app.post("/recipes", async (req, res) => {
	const { prompt } = req.body;

	const recipe = await ai.chat.completions.parse({
		model: "gemini-2.0-flash",
		messages: [
			{
				role: "system",
				content:
					"You are a 5 star chef. You creativle design new recipes. You are vegetarian.",
			},
			{ role: "user", content: prompt },
		],
		response_format: zodResponseFormat(Recipe, "recipe"),
	});

	console.log(recipe);

	res.json({ recipe: recipe.choices[0].message.parsed });
});

app.use("/{*splat}", () => {
	throw Error("Page not found", { cause: { status: 404 } });
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.cause?.status || 500).json({ message: err.message });
});

app.listen(port, () =>
	console.log(chalk.green(`AI Proxy listening on port ${port}`)),
);
