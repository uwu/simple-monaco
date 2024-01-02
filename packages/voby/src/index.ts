import { addThemeIfNeeded, initMonacoIfNeeded, monaco } from "@uwu/simple-monaco-core";
import type { MonacoCompType } from "./types.js";
import { $, h, html, useCleanup, useEffect } from "voby";

export default ((props) => {
	const themeName = () => {
		const t = props.theme?.();
		return t && (Array.isArray(t) ? t[0] : t);
	}

	const div = (
		html`<div
			style=${() => ({ width: props.width ?? "30rem", height: props.height ?? "10rem" })}
		/>` as any
	)();

	let dispose: () => void;
	let cancelInit = false;

	useCleanup(() => {
		cancelInit = true;
		dispose?.();
	});

	(async () => {
		await initMonacoIfNeeded(props.noCDN);
		await addThemeIfNeeded(props.theme?.());
		if (cancelInit) return;

		const ed = monaco.editor.create(div, {
			language: props.lang?.(),
			value: props.value?.() ?? "",
			readOnly: props.readonly?.() ?? false,
			theme: themeName(),
			...props.otherCfg?.(),
		});

		dispose = () => ed.dispose();

		ed.onDidChangeModelContent(() => {
			props.value?.(ed.getValue());
		});

		useEffect(() => {
			ed.updateOptions({ readOnly: props.readonly?.() });
		});

		useEffect(() => {
			if ((props.value?.() ?? "") !== ed.getValue()) ed.setValue(props.value?.() ?? "");
		});

		useEffect(() => {
			addThemeIfNeeded(props.theme?.()).then(() => ed.updateOptions({ theme: themeName() }));
		});

		useEffect(() => {
			const model = ed.getModel();
			const l = props.lang?.();
			if (!model) return;
			monaco.editor.setModelLanguage(model, l);
			ed.setModel(model);
		});

		useEffect(() => {
			if (props.otherCfg?.()) ed.updateOptions(props.otherCfg());
		});
	})();

	return () => div;
}) as MonacoCompType;
