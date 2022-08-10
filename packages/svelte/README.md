# Svelte simple-monaco

Please read the main readme [here](https://github.com/uwu/simple-monaco).

```svelte
<script>
  import Monaco from "@uwu/monaco-svelte";
  import { writable } from "svelte/store";

  let value = writable(""); // Writable<string> | Readable<string>
</script>

<!-- value and lang are required, but not others -->
<Monaco
  {value}
  lang="javascript"
  theme="Monokai"
  readonly={false}
  height="30rem"
  width="20rem"
  otherCfg={{}}
/>

<pre><code>{$value}</code></pre>
```
