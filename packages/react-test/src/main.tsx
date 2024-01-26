import { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import Monaco, { useMonaco } from "../../react";

function App() {
	const [val, setVal] = useState("");
	const [lang, setLang] = useState("javascript");
	const [theme, setTheme] = useState("Monokai");
	const [ro, setRo] = useState(false);

	const [show, setShow] = useState(true);

	const [fontSize, setFontSize] = useState(16);

	return (
		<>
			<h1>Monaco react test</h1>
			<input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
			{show && (
				<Monaco
					value={val}
					lang={lang}
					valOut={setVal}
					theme={theme}
					readonly={ro}
					otherCfg={{ fontSize }}
				/>
			)}
			<pre>
				<code>{val}</code>
			</pre>
			<button onClick={() => setVal("")}>clear</button>
			<input type="text" onChange={(e) => setLang(e.target.value)} />
			<input type="text" onChange={(e) => setTheme(e.target.value)} />
			<input id="ro" type="checkbox" onChange={(e) => setRo(e.target.checked)} />
			<label htmlFor="ro">readonly</label>
			<input type="text" onChange={(e) => setFontSize(parseFloat(e.target.value))} />

			<HookBasedTest />
		</>
	);
}

function HookBasedTest() {
	const [lang, setLang] = useState("javascript");
	const [theme, setTheme] = useState("Monokai");
	const [ro, setRo] = useState(false);

	const [fontSize, setFontSize] = useState(16);

	const [elem, val, setVal, edInst] = useMonaco("", {
		lang,
		theme,
		readonly: ro,
		otherCfg: { fontSize },
	});

	return (
		<>
			<h2>Hooks test</h2>
			Editor instance available: {!!edInst + ""}
			{elem}
			<pre>
				<code>{val}</code>
			</pre>
			<button onClick={() => setVal("")}>clear</button>
			<input type="text" onChange={(e) => setLang(e.target.value)} />
			<input type="text" onChange={(e) => setTheme(e.target.value)} />
			<input id="ro" type="checkbox" onChange={(e) => setRo(e.target.checked)} />
			<label htmlFor="ro">readonly</label>
			<input type="text" onChange={(e) => setFontSize(parseFloat(e.target.value))} />
		</>
	);
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
