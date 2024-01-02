import { mEditor } from "@uwu/simple-monaco-core";

export type CfgOpts = Omit<
	mEditor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type IStandaloneCodeEditor = mEditor.IStandaloneCodeEditor;
