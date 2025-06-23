import express from "express";
import chalk from "chalk";
import cors from "cors";

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Running" });
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
