import { editor } from "monaco-editor";

export type CfgOpts = Omit<
  editor.IStandaloneEditorConstructionOptions,
  "language" | "value" | "readOnly" | "theme"
>;
