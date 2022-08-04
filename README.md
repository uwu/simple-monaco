# Monaco for React

This is a component that wraps Microsoft's great Monaco editor for React.

All props are reactive.

See below for (pretty self explanatory) usage. Comes with TS defs.

You may use any theme from
[*here*](https://github.com/brijeshb42/monaco-themes/tree/master/themes)
by name.

You can use monaco from an npm package by passing to `props.noCDN`.
This will only do anything on the first render of any `<Monaco>`,
and will apply to all later uses of the component.

If you do not do this, monaco will just be loaded from jsDelivr.

## Important note
Compared to the other components I have made for monaco,
the React one is quite complex and also has issues loading
some things - why I can't quite fathom out.

Let's just say react is a... *quirky* framework.
It should work mostly okay though I guess.

```tsx
import {useState} from "react";
import Monaco from "monaco-solid";
import * as monaco from "monaco-editor"

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
      <pre><code>{val}</code></pre>
    </>
  );
}
```