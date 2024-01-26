<script lang="ts">
	import {onDestroy, onMount} from "svelte";
	import {Readable, Writable} from "svelte/store";
	import {
		addThemeIfNeeded,
		initMonacoIfNeeded,
		OtherCfg,
		WrappedEditor
	} from "@uwu/simple-monaco-core";
	import type {MonacoType, ThemeAddProp} from "@uwu/simple-monaco-core";

	export let
		lang: string,
		value: Readable<string> | Writable<string>,
		readonly: boolean = false,
		theme: ThemeAddProp = undefined,
		otherCfg: OtherCfg = {},
		height: string = "10rem",
		width: string = "30rem",
    	noCDN: MonacoType = undefined,
		filename: string,
		editorRef: ((w: WrappedEditor) => void) | Writable<WrappedEditor>;

	let ed: WrappedEditor;

	const isWritable = <T>(s: Readable<T>): s is Writable<T> => s["set"];

	let elem: HTMLDivElement;
	let cancelInit = false;
	onMount(async () => {
		await initMonacoIfNeeded(noCDN);
		await addThemeIfNeeded(theme);

		if (cancelInit) return;

		ed = new WrappedEditor(elem, lang, $value, filename, readonly, theme, otherCfg);

		ed.onChange((v) => isWritable(value) && ($value = v));
	});

	$: if (ed) {
			if (typeof editorRef === "function") editorRef(ed);
			else editorRef.set(ed); // svelte is not smart enough to let me use $ syntax here.
		}

	$: ed?.setValue($value);
	$: ed?.setReadOnly(readonly);
	$: ed?.setTheme(theme);
	$: ed?.setLanguage(lang);
	$: ed?.setFilename(filename);
  $: ed?.setOtherCfg(otherCfg);

	onDestroy(() => {
		cancelInit = true;
		ed?.editor.dispose();
	});
</script>

<div
  bind:this={elem}
  style:width
  style:height
></div>
