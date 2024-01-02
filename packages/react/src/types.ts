import { mEditor, ThemeAddProp } from "@uwu/simple-monaco-core";
import {MonacoType } from "@uwu/simple-monaco-core";

type CfgOpts = Omit<
	mEditor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type CompProps = {
	lang: string;
	value: string;
	valOut?: (v: string) => void;
	readonly?: boolean;
	theme?: ThemeAddProp;
	otherCfg?: CfgOpts;
	height?: string;
	width?: string;
	noCDN?: MonacoType;
};

export type IStandaloneCodeEditor = mEditor.IStandaloneCodeEditor;
