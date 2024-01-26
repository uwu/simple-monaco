<script setup lang="ts">
import {
	addThemeIfNeeded,
	initMonacoIfNeeded,
	MonacoType,
	OtherCfg,
	ThemeAddProp,
	WrappedEditor,
} from "@uwu/simple-monaco-core";
import { onUnmounted, watchEffect } from "vue";

const props = defineProps<{
	lang: string;
	modelValue: string;
	readonly?: boolean;
	theme?: ThemeAddProp;
	otherCfg?: OtherCfg;
	height?: string;
	width?: string;
	noCDN?: MonacoType;
	filename: string;
}>();
const emit = defineEmits<{
	(event: "update:modelValue", value: string): void;
	(event: "editorRef", ed: WrappedEditor): void;
}>();

let dispose: () => void;
let cancelInit = false;

let firstRun = true;
const refCb = async (elem: HTMLDivElement) => {
	// vue why does this run more than once??? oh well.
	if (!firstRun) return;
	firstRun = false;

	await initMonacoIfNeeded(props.noCDN);
	await addThemeIfNeeded(props.theme);
	if (cancelInit) return;

	const ed = new WrappedEditor(
		elem,
		props.lang,
		props.modelValue,
		props.filename,
		props.readonly,
		props.theme,
		props.otherCfg,
	);

	dispose = () => ed.editor.dispose();

	ed.onChange((v) => emit("update:modelValue", v));
	watchEffect(() => ed.setReadOnly(props.readonly));
	watchEffect(() => ed.setValue(props.modelValue));
	watchEffect(() => ed.setTheme(props.theme));
	watchEffect(() => ed.setLanguage(props.lang));
	watchEffect(() => ed.setFilename(props.filename));
	watchEffect(() => ed.setOtherCfg(props.otherCfg));

	emit("editorRef", ed);
};

onUnmounted(() => dispose?.());
</script>

<template>
	<div :ref="refCb" :style="{ width: props.width ?? '30rem', height: props.height ?? '10rem' }" />
</template>
