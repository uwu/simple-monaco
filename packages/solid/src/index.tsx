import { Component, createEffect, onCleanup, Setter } from "solid-js";
import {
	addThemeIfNeeded,
	initMonacoIfNeeded,
	MonacoType, OtherCfg,
	ThemeAddProp,
	WrappedEditor
} from "@uwu/simple-monaco-core";

type MonacoCompType = Component<{
	lang: string;
	value: string;
	valOut?: Setter<string>;
	readonly?: boolean;
	theme?: ThemeAddProp;
	otherCfg?: OtherCfg;
	height?: string;
	width?: string;
	noCDN?: MonacoType;
	filename?: string;
	editorRef?: Setter<WrappedEditor>;
}>

export default ((props) => {
	let dispose: () => void;
	let cancelInit = false;

	const refCb = async (elem: HTMLDivElement) => {
		await initMonacoIfNeeded(props.noCDN);

		await addThemeIfNeeded(props.theme);

		if (cancelInit) return;

		const ed = new WrappedEditor(elem, props.lang, props.value, props.filename, props.readonly, props.theme, props.otherCfg);

		dispose = () => ed.editor.dispose();

		ed.onChange(v => props.valOut?.(v));

		createEffect(() => ed.setReadOnly(props.readonly));
		createEffect(() => ed.setValue(props.value));
		createEffect(() => ed.setTheme(props.theme));
		createEffect(() => ed.setLanguage(props.lang));
		createEffect(() => ed.setFilename(props.filename));
		createEffect(() => ed.setOtherCfg(props.otherCfg));

		createEffect(() => props.editorRef?.(ed));
	};

	onCleanup(() => {
		cancelInit = true;
		dispose?.();
	});

	return (
		<div ref={refCb} style={{ width: props.width ?? "30rem", height: props.height ?? "10rem" }} />
	);
}) as MonacoCompType;
