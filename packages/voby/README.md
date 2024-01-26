# Voby simple-monaco

Please read the main readme [here](https://github.com/uwu/simple-monaco).

```tsx
import { html, $ } from "voby";
import Monaco from "@uwu/monaco-voby";

export default () => {
	const val = $("");

	return html`
		<${Monaco}
			value=${val} // required
			lang="javascript" // required
			theme="Monokai"
			readonly=${false}
			height="30rem"
			width="20rem"
			otherCfg=${{}}
		/>
		<pre>
			<code>${val}</code>
		</pre>
	`;
};
```
