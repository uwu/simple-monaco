import { mEditor, MonacoType, ThemeAddProp } from "@uwu/simple-monaco-core";
import { html, ObservableLike, ObservableReadonlyLike } from "voby";

type CfgOpts = Omit<
	mEditor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type MonacoCompType = (p: {
	lang: ObservableReadonlyLike<string>;
	value: ObservableLike<string>;
	readonly?: ObservableReadonlyLike<boolean>;
	theme?: ObservableReadonlyLike<ThemeAddProp>;
	otherCfg?: ObservableReadonlyLike<CfgOpts>;
	height?: ObservableReadonlyLike<string>;
	width?: ObservableReadonlyLike<string>;
	noCDN?: MonacoType;
}) => ReturnType<typeof html>;
