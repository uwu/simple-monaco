import { createRef, PureComponent, RefObject, useState } from "react";
import {
	addThemeIfNeeded,
	initMonacoIfNeeded,
	MonacoType,
	OtherCfg,
	ThemeAddProp,
	WrappedEditor,
} from "@uwu/simple-monaco-core";

// every part of this mess is necessary
// yes, even the mutex and preserving the node children
// react is a truly painful beast :(
// -- sink

type Props = {
	lang: string;
	value: string;
	valOut?: (v: string) => void;
	readonly?: boolean;
	theme?: ThemeAddProp;
	otherCfg?: OtherCfg;
	height?: string;
	width?: string;
	noCDN?: MonacoType;
	filename?: string;
	editorRef?: RefObject<WrappedEditor> | ((e: WrappedEditor) => void);
};

export default class SimpleMonaco extends PureComponent<Props> {
	ref = createRef<HTMLDivElement>();
	ed: WrappedEditor;
	private elems: Element[];
	// 0 = uninited
	// 1 = mutex initing
	// 2 = inited, no need for mutex
	private initState = 0;

	updateRefOut() {
		if (!this.props.editorRef) return;
		if (typeof this.props.editorRef === "function") this.props.editorRef(this.ed);
		// @ts-expect-error I've read the React source, .current need not be read only, shush TS.
		else this.props.editorRef.current = this.ed;
	}

	async initMonaco() {
		await initMonacoIfNeeded(this.props.noCDN);

		await addThemeIfNeeded(this.props.theme);

		this.initState = 2;

		this.ed = new WrappedEditor(
			this.ref.current,
			this.props.lang,
			this.props.value,
			this.props.filename,
			this.props.readonly,
			this.props.theme,
			this.props.otherCfg,
		);

		this.ed.onChange((v: string) => this.props.valOut?.(v));

		this.updateRefOut();
	}

	componentDidMount() {
		if (this.initState !== 1)
			// noinspection JSIgnoredPromiseFromCall
			this.initMonaco();
		this.initState = 1;

		if (this.elems && this.initState !== 2) {
			this.ref.current.innerHTML = "";
			this.ref.current.append(...this.elems);
		}
	}

	componentWillUnmount() {
		if (this.initState !== 2) this.elems = Array.from(this.ref.current.children);
		else this.ed?.editor.dispose();
	}

	componentDidUpdate(prevProps: Readonly<Props>) {
		if (this.initState !== 2) return;

		if (this.props.readonly !== prevProps.readonly) this.ed.setReadOnly(this.props.readonly);

		this.ed.setValue(this.props.value);

		if (this.props.theme !== prevProps.theme) this.ed.setTheme(this.props.theme);

		if (this.props.lang !== prevProps.lang) this.ed.setLanguage(this.props.lang);

		if (this.props.otherCfg !== prevProps.otherCfg) this.ed.setOtherCfg(this.props.otherCfg);

		if (this.props.editorRef !== prevProps.editorRef) this.updateRefOut();
	}

	render() {
		return (
			<div
				ref={this.ref}
				style={{
					width: this.props.width ?? "30rem",
					height: this.props.height ?? "10rem",
				}}
			/>
		);
	}
}

type HookProps = Omit<Props, "value" | "valOut" | "editorRef">;
type HookRet = [JSX.Element, string, (s: string) => void, WrappedEditor | undefined];

export function useMonaco(initVal: string, props: HookProps): HookRet {
	const [val, setVal] = useState(initVal);
	const [escHatch, setEscHatch] = useState<WrappedEditor>();

	return [
		<SimpleMonaco {...props} value={val} valOut={setVal} editorRef={setEscHatch} />,
		val,
		setVal,
		escHatch,
	];
}
