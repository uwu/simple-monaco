import { IStandaloneCodeEditor, MonacoCompType } from "./types";
import { useEffect, useRef } from "react";
import { addThemeIfNeeded, initMonacoIfNeeded, monaco } from "./monaco";

export default ((props) => {
  const dispose = useRef<() => void>();
  //const cancelInit = useRef<boolean>();
  const ed = useRef<IStandaloneCodeEditor>();

  useEffect(() => () => {
    // unmount
    //cancelInit.current = true;
    dispose.current?.();
  })

  // actual cancer. vue does this and react does this. WHY????
  const initHappened = useRef(false);
  const refCb = async (elem: HTMLDivElement) => {
    if (!elem || initHappened.current) return;
    initHappened.current = true;

    await initMonacoIfNeeded(props.noCDN);

    await addThemeIfNeeded(props.theme);

    //if (cancelInit.current) return;

    ed.current = monaco.editor.create(elem, {
      language: props.lang,
      value: props.value,
      readOnly: props.readonly ?? false,
      theme: props.theme,
      ...props.otherCfg,
    });

    dispose.current = () => ed.current.dispose();

    ed.current.onDidChangeModelContent(() =>
      props.valOut?.(ed.current.getValue())
    );
  };

  useEffect(
    () => ed.current?.updateOptions({ readOnly: props.readonly }),
    [props.readonly]
  );

  useEffect(() => {
    if (props.value !== ed.current?.getValue())
      ed.current?.setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    addThemeIfNeeded(props.theme).then(() =>
      ed.current?.updateOptions({ theme: props.theme })
    );
  }, [props.theme]);

  useEffect(() => {
    const model = ed.current?.getModel();
    if (!model) return;
    monaco.editor.setModelLanguage(model, props.lang);
    ed.current.setModel(model);
  }, [props.lang]);

  useEffect(
    () => props.otherCfg && ed.current?.updateOptions(props.otherCfg),
    [props.otherCfg]
  );

  return (
    <div
      ref={refCb}
      style={{
        width: props.width ?? "30rem",
        height: props.height ?? "10rem",
      }}
    />
  );
}) as MonacoCompType;
