import loader from "@monaco-editor/loader";
import type { Monaco } from "@monaco-editor/loader";

export let monaco: Monaco;
let monacoLoaded: Promise<void>;

const loadedThemes = new Set<string>();

export const addThemeIfNeeded = async (t: string) => {
	if (!monaco) await monacoLoaded;
	if (!t || !t.trim()) return;
	if (loadedThemes.has(t)) return;

	loadedThemes.add(t);

	const u = `https://cdn.esm.sh/monaco-themes@0.4.2/themes/${t}.json`;

	const theme = await fetch(u).then((r) => r.json());

	monaco.editor.defineTheme(t, theme);
};

export const initMonacoIfNeeded = async () => {
	if (monaco) return;

	if (!monacoLoaded)
		monacoLoaded = loader.init().then((m) => {
			monaco = m;
		});

	await monacoLoaded;
};