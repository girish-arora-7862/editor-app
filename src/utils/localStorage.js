import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { LS_EDITOR } from "../constants";

export const saveEditorDataToLS = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const stringifiedContent = JSON.stringify(rawContentState);
  localStorage.setItem(LS_EDITOR, stringifiedContent);
};

export const getEditorDataFromLS = () => {
  const retrievedContent = localStorage.getItem(LS_EDITOR);
  if (retrievedContent) {
    const rawContentFromStore = JSON.parse(retrievedContent);
    const contentState = convertFromRaw(rawContentFromStore);
    return EditorState.createWithContent(contentState);
  }
};
