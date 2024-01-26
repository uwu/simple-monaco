import { editor } from "monaco-editor";
import { addThemeIfNeeded, monaco, nameOfTheme, OtherCfg, ThemeAddProp } from "./index.js";

let uriId = 0;
function getURI(filename?: string) {
	if (filename) return monaco.Uri.parse(`inmemory://sm-model/${filename}`);
	else return monaco.Uri.parse(`inmemory://sm-auto-model/${uriId++}`);
}

// editor wrapper, manages the model for you
export default class WrappedEditor {
	editor: editor.IStandaloneCodeEditor;
	// careful: theme must be manually prepared before adding here.
	constructor(
		elem: HTMLElement,
		language: undefined | string,
		value: undefined | string,
		filename: string | undefined,
		readonly: boolean | undefined,
		theme: ThemeAddProp | undefined,
		otherCfg: undefined | editor.IStandaloneEditorConstructionOptions,
	) {
		this.editor = monaco.editor.create(elem, {
			model: monaco.editor.createModel(value ?? "", language, getURI(filename)),
			readOnly: readonly ?? false,
			theme: nameOfTheme(theme),
			...otherCfg,
		});
	}

	setValue(value = "") {
		if (value !== this.editor.getValue()) this.editor.setValue(value);
	}

	setLanguage(lang?: string) {
		const model = this.editor.getModel();
		monaco.editor.setModelLanguage(model, lang);
	}

	setFilename(filename?: string) {
		const uri = getURI(filename);
		const model = this.editor.getModel();
		if (model.uri.toString() !== uri.toString()) {
			this.editor.setModel(
				monaco.editor.createModel(model.getValue(), model.getLanguageId(), uri),
			);
		}
	}

	onChange(cb: (v: string) => void) {
		this.editor.onDidChangeModelContent(() => cb(this.editor.getValue()));
	}

	setReadOnly(readOnly: boolean) {
		this.editor.updateOptions({ readOnly });
	}

	setTheme(theme: ThemeAddProp) {
		addThemeIfNeeded(theme).then(() => monaco.editor.setTheme(nameOfTheme(theme)));
	}

	setOtherCfg(otherCfg?: OtherCfg) {
		if (!otherCfg) return;
		this.editor.updateOptions(otherCfg);
	}
}
