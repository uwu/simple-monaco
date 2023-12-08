# React simple-monaco

Please read the main readme [here](https://github.com/uwu/simple-monaco).

```tsx
import { useState } from "react";
import Monaco from "@uwu/monaco-react";
import * as monaco from "monaco-editor";

export default () => {
	const [val, setVal] = useState("");

	// unless specified, all props are optional
	return (
		<>
			<Monaco
				value={val} // required
				valOut={setVal}
				lang="javascript" // required
				theme="Monokai"
				readonly={false}
				height="30rem"
				width="20rem"
				otherCfg={{}}
				noCDN={monaco}
			/>
			<pre>
				<code>{val}</code>
			</pre>
		</>
	);
};
```
