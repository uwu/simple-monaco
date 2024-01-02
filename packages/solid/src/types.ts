import {MonacoType, mEditor, ThemeAddProp} from "@uwu/simple-monaco-core"
import { Component, Setter } from "solid-js";

type CfgOpts = Omit<
	mEditor.IStandaloneEditorConstructionOptions,
	"language" | "value" | "readOnly" | "theme"
>;

export type MonacoCompType = Component<{
	lang: string;
	value: string;
	valOut?: Setter<string>;
	readonly?: boolean;
	theme?: ThemeAddProp;
	otherCfg?: CfgOpts;
	height?: string;
	width?: string;
	noCDN?: MonacoType;
}>;
