<script setup lang="ts">

import type {CfgOpts} from "./types";
import {addThemeIfNeeded, initMonacoIfNeeded, monaco} from "./monaco";
import {onUnmounted, watchEffect} from "vue";
import type {Monaco} from "@monaco-editor/loader";

const props = defineProps<{
  lang: string;
  modelValue: string;
  readonly?: boolean;
  theme?: string;
  otherCfg?: CfgOpts;
  height?: string;
  width?: string;
  noCDN?: Monaco;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
}>();

let dispose: () => void;
let cancelInit = false;

let firstRun = true;

const refCb = async (elem: HTMLDivElement) => {
  // vue what in the name of the good lord is wrong with you
  // fucking bullshit smh aw fuck i cant believe youve done this
  if (!firstRun) return;
  firstRun = false;

  await initMonacoIfNeeded(props.noCDN);
  await addThemeIfNeeded(props.theme);
  if (cancelInit) return;

  const ed = monaco.editor.create(elem, {
    language: props.lang,
    value: props.modelValue,
    readOnly: props.readonly ?? false,
    theme: props.theme,
    ...props.otherCfg
  });

  dispose = () => ed.dispose();

  ed.onDidChangeModelContent(() => emit("update:modelValue", ed.getValue()));
  watchEffect(() => ed.updateOptions({readOnly: props.readonly}));
  watchEffect(() => props.modelValue !== ed.getValue() && ed.setValue(props.modelValue));

  watchEffect(async () => {
    await addThemeIfNeeded(props.theme);
    ed.updateOptions({theme: props.theme});
  });

  watchEffect(() => {
    const model = ed.getModel();
    if (!model) return;
    monaco.editor.setModelLanguage(model, props.lang);
    ed.setModel(model);
  });
};

onUnmounted(() => dispose?.());

</script>

<template>
  <div :ref="refCb" :style="{width: props.width ?? '30rem', height: props.height ?? '10rem'}"/>
</template>