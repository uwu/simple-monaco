import { editor } from "monaco-editor";
import type { Monaco } from "@monaco-editor/loader";

type CfgOpts = Omit<
	editor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type CompProps = {
	lang: string;
	value: string;
	valOut?: (v: string) => void;
	readonly?: boolean;
	theme?: string;
	otherCfg?: CfgOpts;
	height?: string;
	width?: string;
	noCDN?: Monaco;
};

export type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
