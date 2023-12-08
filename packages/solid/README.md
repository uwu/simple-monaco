# Solid simple-monaco

Please read the main readme [here](https://github.com/uwu/simple-monaco).

```tsx
import { createSignal } from "solid-js";
import Monaco from "@uwu/monaco-solid";

export default () => {
	const [val, setVal] = createSignal("");

	return (
		<>
			<Monaco
				value={val()} // required
				valOut={setVal}
				lang="javascript" // required
				theme="Monokai"
				readonly={false}
				height="30rem"
				width="20rem"
				otherCfg={{}}
			/>
			<pre>
				<code>{val()}</code>
			</pre>
		</>
	);
};
```
