import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/loader";
import { Component, Setter } from "solid-js";

type CfgOpts = Omit<
	editor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type MonacoCompType = Component<{
	lang: string;
	value: string;
	valOut?: Setter<string>;
	readonly?: boolean;
	theme?: string;
	otherCfg?: CfgOpts;
	height?: string;
	width?: string;
	noCDN?: Monaco;
}>;
