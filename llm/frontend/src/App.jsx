import { useState } from "react";
import "./App.css";
import Markdown from "marked-react";
import Lowlight from "react-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import rust from "highlight.js/lib/languages/rust";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/night-owl.css";

Lowlight.registerLanguage("js", javascript);
Lowlight.registerLanguage("javascript", javascript);
Lowlight.registerLanguage("ts", typescript);
Lowlight.registerLanguage("typescript", typescript);
Lowlight.registerLanguage("bash", bash);
Lowlight.registerLanguage("rust", rust);

const renderer = {
	code(snippet, lang) {
		const usedLang = Lowlight.hasLanguage() ? lang : "bash";
		return (
			<Lowlight key={this.elementId} language={usedLang} value={snippet} />
		);
	},
};

function App() {
	const [prompt, setPrompt] = useState("");
	const [aiResponse, setAiResponse] = useState("");
	const [pending, setPending] = useState(false);
	const [isImageGen, setIsImageGen] = useState(false);
	const [base64img, setBase64img] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isImageGen) {
			handleImageGen();
			return;
		}
		try {
			setPending(true);
			console.log("Work to be done");
		} catch (error) {
			console.error("Error ", error);
		} finally {
			setPending(false);
		}
	};

	const reset = () => {
		setAiResponse("");
		setPrompt("");
	};

	return (
		<main className="h-screen p-2 mx-auto w-5xl flex flex-col items-center">
			<form onSubmit={handleSubmit} className="flex w-full gap-2 items-end">
				<textarea
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder={
						isImageGen ? "Prompt your image..." : "State your question..."
					}
					className="textarea textarea-primary flex-10/12 h-40 resize-none"
				/>
				<div className="flex-2/12 flex flex-col gap-2">
					<label className="label">
						<input
							type="checkbox"
							checked={isImageGen}
							onChange={() => setIsImageGen((p) => !p)}
							className="checkbox"
						/>
						Image Generation
					</label>
					<button type="submit" className="btn btn-primary " disabled={pending}>
						{pending ? (
							<span className="loading loading-spinner" />
						) : (
							<span>Send</span>
						)}
					</button>
					<button className="btn btn-secondary" type="reset" onClick={reset}>
						Clear
					</button>
				</div>
			</form>
			<div className="mockup-window border  w-full my-4 flex-1 overflow-y-auto text-start px-4 ">
				{isImageGen && !base64img && (
					<div className="skeleton mask mask-squircle w-72 aspect-square" />
				)}
				{base64img && (
					<div className="mask mask-squircle w-72">
						<span>Generated image will be placed here</span>
					</div>
				)}
				<Markdown value={aiResponse} renderer={renderer} />
			</div>
		</main>
	);
}

export default App;
