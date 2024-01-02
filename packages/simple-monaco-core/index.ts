import loader from "@monaco-editor/loader";
import type { Monaco } from "@monaco-editor/loader";
import { editor } from "monaco-editor";
import namedList from "monaco-themes/themes/themelist.json"

export let monaco: Monaco;
let monacoLoaded: Promise<void>;

const loadedThemes = new Set<string | object>();

export const namedThemes = Object.keys(namedList);

export async function addThemeIfNeeded(t: ThemeAddProp) {
	let name: string;
	let theme: editor.IStandaloneThemeData;
	if (Array.isArray(t))
		[name, theme] = t;
	else name = t;

	if (!name || !name.trim() || loadedThemes.has(name)) return;

	loadedThemes.add(name);

	if (!theme) {
		let url = name;
		try {
			new URL(url);
		}
		catch {
			if (namedList[name])
				url = `https://cdn.esm.sh/monaco-themes@0.4.4/themes/${namedList[name]}.json`;
			else throw new Error(`${name} is not a theme in the monaco-themes package so cannot be used by name.`)
		}

		theme = await fetch(url).then((r) => r.json());
	}

	monaco.editor.defineTheme(name, theme);
}

type PostLoadCb = (m: Monaco) => void | Promise<void>;
let postLoadCallbacks: (PostLoadCb)[];
export function registerPostloadCallback(cb: PostLoadCb) {
	postLoadCallbacks.push(cb);
}

export async function initMonacoIfNeeded(useNpmMonaco?: Monaco) {
	if (monaco) return;

	if (!monacoLoaded) {
		if (useNpmMonaco) loader.config({ monaco: useNpmMonaco });

		monacoLoaded = loader.init().then(async (m) => {
			monaco = m;

			for (const cb of postLoadCallbacks) await cb(m);
		});
	}
	await monacoLoaded;
}

// useful reexports
export type ThemeAddProp = string | [string, editor.IStandaloneThemeData];
export {Monaco as MonacoType} from "@monaco-editor/loader";
export {editor as mEditor} from "monaco-editor";