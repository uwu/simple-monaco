import loader from "@monaco-editor/loader";
import type { Monaco } from "@monaco-editor/loader";

export let monaco: Monaco;
let monacoLoaded: Promise<void>;

const loadedThemes = new Set<string>();

export async function addThemeIfNeeded(t: string) {
  if (!t || !t.trim() || loadedThemes.has(t)) return;

  loadedThemes.add(t);

  const u = `https://cdn.esm.sh/monaco-themes@0.4.2/themes/${t}.json`;

  const theme = await fetch(u).then((r) => r.json());

  monaco.editor.defineTheme(t, theme);
}

export async function initMonacoIfNeeded(useNpmMonaco?: Monaco) {
  if (monaco) return;

  if (useNpmMonaco) loader.config({ monaco: useNpmMonaco });

  if (!monacoLoaded)
    monacoLoaded = loader.init().then((m) => {
      monaco = m;
    });

  await monacoLoaded;
}
