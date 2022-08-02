import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Monaco from "../../src";

function App() {
  const [val, setVal] = useState("");
  const [lang, setLang] = useState("javascript");
  const [theme, setTheme] = useState("Monokai");
  const [ro, setRo] = useState(false);

  return (
    <>
      <h1>Monaco solid test</h1>
      <Monaco
        value={val}
        lang={lang}
        valOut={setVal}
        theme={theme}
        readonly={ro}
      />
      <pre>
        <code>{val}</code>
      </pre>
      <button onClick={() => setVal("")}>clear</button>
      <input type="text" onChange={(e) => setLang(e.target.value)} />
      <input type="text" onChange={(e) => setTheme(e.target.value)} />
      <input
        id="ro"
        type="checkbox"
        onChange={(e) => setRo(e.target.checked)}
      />
      <label htmlFor="ro">readonly</label>
    </>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
