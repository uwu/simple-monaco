<script lang="ts">
  import Monaco from "../../svelte";
  import {writable} from "svelte/store";

  let value = writable("");
	let lang = "javascript";
	let theme = "Monokai"
  let ro = false;

  let fontSize = 16;
</script>

<h1>Monaco svelte test</h1>

<Monaco {value} {lang} {theme} readonly={ro} otherCfg={{fontSize}} />

<pre><code>{$value}</code></pre>

<button on:click={() => $value = ""}>clear</button>

<input type="text" on:change={e => lang = e.target.value} />
<input type="text" on:change={e => theme = e.target.value} />
<input type="text" on:change={e => fontSize = parseFloat(e.target.value)} />
<input id="ro" type="checkbox" on:change={e => ro = e.target.checked} />
<label for="ro">readonly</label>