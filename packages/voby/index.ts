import {
	addThemeIfNeeded,
	initMonacoIfNeeded,
	MonacoType,
	OtherCfg,
	ThemeAddProp,
	WrappedEditor,
} from "@uwu/simple-monaco-core";
import { h, ObservableLike, ObservableReadonlyLike, useCleanup, useEffect } from "voby";

type MonacoCompType = (p: {
	lang: ObservableReadonlyLike<string>;
	value: ObservableLike<string>;
	readonly?: ObservableReadonlyLike<boolean>;
	theme?: ObservableReadonlyLike<ThemeAddProp>;
	otherCfg?: ObservableReadonlyLike<OtherCfg>;
	height?: ObservableReadonlyLike<string>;
	width?: ObservableReadonlyLike<string>;
	noCDN?: MonacoType;
	filename?: ObservableReadonlyLike<string>;
	editorRef?: (w: WrappedEditor) => void;
}) => () => HTMLDivElement;

export default ((props) => {
	const div = h("div", {
		style: () => ({ width: props.width ?? "30rem", height: props.height ?? "10rem" }),
	})() as HTMLDivElement;

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

		const ed = new WrappedEditor(
			div,
			props.lang?.(),
			props.value?.(),
			props.filename?.(),
			props.readonly?.(),
			props.theme?.(),
			props.otherCfg?.(),
		);

		dispose = () => ed.editor.dispose();

		ed.onChange((v) => props.value?.(v));

		useEffect(() => ed.setReadOnly(props.readonly?.()));
		useEffect(() => ed.setValue(props.value?.()));
		useEffect(() => ed.setTheme(props.theme?.()));
		useEffect(() => ed.setLanguage(props.lang?.()));
		useEffect(() => ed.setFilename(props.filename?.()));
		useEffect(() => ed.setOtherCfg(props.otherCfg?.()));

		props.editorRef?.(ed);
	})();

	return () => div;
}) as MonacoCompType;
