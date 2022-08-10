<script lang="ts">
  import Monaco from "../..";
  import {writable} from "svelte/store";

  let value = writable("");
	let lang = "javascript";
	let theme = "Monokai"
  let ro = false;
</script>

<h1>Monaco svelte test</h1>

<Monaco {value} {lang} {theme} readonly={ro} />

<pre><code>{$value}</code></pre>

<button on:click={() => $value = ""}>clear</button>

<input type="text" on:change={e => lang = e.target.value} />
<input type="text" on:change={e => theme = e.target.value} />
<input id="ro" type="checkbox" on:change={e => ro = e.target.checked} />
<label for="ro">readonly</label>