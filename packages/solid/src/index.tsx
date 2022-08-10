import { createEffect, onCleanup } from "solid-js";
import { addThemeIfNeeded, initMonacoIfNeeded, monaco } from "./monaco";
import type { MonacoCompType } from "./types";

export default ((props) => {
  let dispose: () => void;
  let cancelInit = false;

  const refCb = async (elem: HTMLDivElement) => {
    await initMonacoIfNeeded();

    await addThemeIfNeeded(props.theme);

    if (cancelInit) return;

    const ed = monaco.editor.create(elem, {
      language: props.lang,
      value: props.value,
      readOnly: props.readonly ?? false,
      theme: props.theme,
      ...props.otherCfg,
    });

    dispose = () => ed.dispose();

    // stops syntax highlighting flickering
    //let valueAntiflicker = false;

    ed.onDidChangeModelContent(() => {
      //valueAntiflicker = true;
      props.valOut?.(ed.getValue());
      //valueAntiflicker = false;
    });

    createEffect(() => ed.updateOptions({ readOnly: props.readonly }));

    createEffect(() => {
      if (props.value !== ed.getValue()) ed.setValue(props.value);
    });

    createEffect(async () => {
      await addThemeIfNeeded(props.theme);
      ed.updateOptions({ theme: props.theme });
    });

    createEffect(() => {
      const model = ed.getModel();
      if (!model) return;
      monaco.editor.setModelLanguage(model, props.lang);
      ed.setModel(model);
    });
  };

  onCleanup(() => {
    cancelInit = true;
    dispose?.();
  });

  return (
    <div
      ref={refCb}
      style={{ width: props.width ?? "30rem", height: props.height ?? "10rem" }}
    />
  );
}) as MonacoCompType;
