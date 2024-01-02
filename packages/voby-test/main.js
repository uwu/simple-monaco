import Monaco from "@uwu/monaco-voby";
import { render, h, html, $ } from "voby"

function App() {
	const value = $("");
	const lang = $("javascript");
	const theme = $("Monokai");
	const ro = $(false);
	const fontSize = $(16);

	return html`
			<h1>Monaco voby test</h1>
			<${Monaco}
				value=${value}
				lang=${lang}
				theme=${theme}
				readonly=${ro}
				otherCfg=${() => ({ fontSize: fontSize() })}
			/>

			<input type="text" onchange=${(e) => lang(e.target.value)} />
			<input type="text" onchange=${(e) => theme(e.target.value)} />
			<input type="text" onchange=${(e) => fontSize(parseFloat(e.target.value))} />
			<input type="checkbox" onchange=${(e) => ro(e.target.checked)} />
		`;
}

render(h(App), document.body);