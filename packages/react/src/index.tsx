import { IStandaloneCodeEditor, CompProps } from "./types";
// react import is needed for typescript (????)
import React, { createRef, PureComponent } from "react";
import { addThemeIfNeeded, initMonacoIfNeeded, monaco } from "@uwu/simple-monaco-core";

// every part of this mess is necessary
// yes, even the mutex and preserving the node children
// react is a truly painful beast :(
// -- sink

export default class extends PureComponent<CompProps> {
	ref = createRef<HTMLDivElement>();
	ed: IStandaloneCodeEditor;
	elems: Element[];
	// 0 = uninited
	// 1 = mutex initing
	// 2 = inited, no need for mutex
	initState = 0;

	get themeName() {
		return Array.isArray(this.props.theme) ? this.props.theme[0] : this.props.theme;
	}

	async initMonaco() {
		await initMonacoIfNeeded(this.props.noCDN);

		await addThemeIfNeeded(this.props.theme);

		this.initState = 2;

		this.ed = monaco.editor.create(this.ref.current, {
			language: this.props.lang,
			value: this.props.value,
			readOnly: this.props.readonly ?? false,
			theme: this.themeName,
			...this.props.otherCfg,
		});

		/*if (this.props.modelURL) {
			let uri = this.props.modelURL;
			if (typeof uri === "string") {
				uri = monaco.Uri.parse(uri);
			}


		}*/

		this.ed.onDidChangeModelContent(() => this.props.valOut?.(this.ed.getValue()));
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
		else this.ed?.dispose();
	}

	componentDidUpdate(prevProps: Readonly<CompProps>) {
		if (this.initState !== 2) return;

		if (this.props.readonly !== prevProps.readonly)
			this.ed.updateOptions({ readOnly: this.props.readonly });

		if (this.props.value !== this.ed.getValue()) this.ed.setValue(this.props.value);

		if (this.props.theme !== prevProps.theme)
			addThemeIfNeeded(this.props.theme).then(() =>
				this.ed.updateOptions({ theme: this.themeName }),
			);

		if (this.props.lang !== prevProps.lang) {
			const model = this.ed.getModel();
			if (model) {
				monaco.editor.setModelLanguage(model, this.props.lang);
				this.ed.setModel(model);
			}
		}

		if (this.props.otherCfg !== prevProps.otherCfg && this.props.otherCfg)
			this.ed.updateOptions(this.props.otherCfg);
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
