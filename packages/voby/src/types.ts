import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/loader";
import { html, ObservableLike, ObservableReadonlyLike } from "voby";

type CfgOpts = Omit<
	editor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type MonacoCompType = (p: {
	lang: ObservableReadonlyLike<string>;
	value: ObservableLike<string>;
	readonly?: ObservableReadonlyLike<boolean>;
	theme?: ObservableReadonlyLike<string>;
	otherCfg?: ObservableReadonlyLike<CfgOpts>;
	height?: ObservableReadonlyLike<string>;
	width?: ObservableReadonlyLike<string>;
	noCDN?: Monaco;
}) => ReturnType<typeof html>;
