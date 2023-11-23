import React, { useEffect } from "react";
import "./App.css";
import "draft-js/dist/Draft.css";
import { Editor, EditorState } from "draft-js";
import {
  getEditorData,
  removePrefixAndApplyStyles,
  resetFontAndStyles,
} from "./utils/editor";
import { getEditorDataFromLS, saveEditorDataToLS } from "./utils/localStorage";
import { PREFIX_STYLES, STYLE_MAP } from "./constants";

const App = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (newEditorState) => {
    let resultEditorState = newEditorState;
    const { blockText } = getEditorData(resultEditorState);

    PREFIX_STYLES.forEach((data) => {
      if (blockText.startsWith(data.prefix)) {
        resultEditorState = removePrefixAndApplyStyles(
          resultEditorState,
          data.prefix,
          data.style,
          data.font
        );
      }
    });

    if (blockText === "") {
      resultEditorState = resetFontAndStyles(resultEditorState);
    }

    setEditorState(resultEditorState);
  };

  const handleSave = () => {
    saveEditorDataToLS(editorState);
  };

  useEffect(() => {
    const savedEditorData = getEditorDataFromLS();
    if (savedEditorData) {
      setEditorState(savedEditorData);
    }
  }, []);

  return (
    <div className="App">
      <div className="Row-1">
        <div></div>
        <div>
          <div className="heading">
            <h3>Demo Editor By Girish Arora</h3>
          </div>
        </div>
        <div>
          <div className="btn-wrapper">
            <button onClick={handleSave}>SAVE</button>
          </div>
        </div>
      </div>
      <div className="Row-2">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          customStyleMap={STYLE_MAP}
        />
      </div>
    </div>
  );
};

export default App;
