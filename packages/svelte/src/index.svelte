<script lang="ts">
	import {onDestroy, onMount} from "svelte";
	import {Readable, Writable} from "svelte/store";
	import type {CfgOpts, IStandaloneCodeEditor} from "./types";
	import {addThemeIfNeeded, initMonacoIfNeeded, monaco} from "./monaco";

	export let
		lang: string,
		value: Readable<string> | Writable<string>,
		readonly: boolean = false,
		theme: string = undefined,
		otherCfg: CfgOpts = {},
		height: string = "10rem",
		width: string = "30rem";

	let ed: IStandaloneCodeEditor;

	const isWritable = <T>(s: Readable<T>): s is Writable<T> => s["set"];

	let elem: HTMLDivElement;
	let cancelInit = false;
	onMount(async () => {
		await initMonacoIfNeeded();
		await addThemeIfNeeded(theme);

		if (cancelInit) return;

		ed = monaco.editor.create(elem, {
			language: lang,
			value: $value,
			readOnly: readonly,
			theme,
			...otherCfg
		});

		ed.onDidChangeModelContent(() => isWritable(value) && ($value = ed.getValue()));
	});

	$: if ($value !== ed?.getValue()) ed?.setValue($value);
	$: ed?.updateOptions({readOnly: readonly});
	$: addThemeIfNeeded(theme).then(() => ed?.updateOptions({theme}));

	$: {
		const model = ed?.getModel();
		if (model) {
			monaco.editor.setModelLanguage(model, lang);
			ed.setModel(model);
		}
	}

	onDestroy(() => {
		cancelInit = true;
		ed.dispose();
	});
</script>

<div
  bind:this={elem}
  style:width
  style:height
></div>