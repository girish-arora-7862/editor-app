import { EditorState, Modifier, RichUtils } from "draft-js";
import { STYLES } from "../constants";

export const getEditorData = (resultEditorState) => {
  const contentState = resultEditorState.getCurrentContent();
  const selectionState = resultEditorState.getSelection();
  const blockKey = selectionState.getStartKey();
  const blockText = contentState.getBlockForKey(blockKey).getText();
  const blockType = contentState.getBlockForKey(blockKey).getType();
  return { contentState, selectionState, blockKey, blockText, blockType };
};

export const removePrefixAndApplyStyles = (
  resultEditorState,
  prefix,
  style,
  font
) => {
  const { contentState, selectionState } = getEditorData(resultEditorState);

  const targetRange = selectionState.merge({
    anchorOffset: 0,
    focusOffset: prefix.length,
  });

  const newContentState = Modifier.removeRange(
    contentState,
    targetRange,
    "backward"
  );

  resultEditorState = EditorState.push(
    resultEditorState,
    newContentState,
    "remove-range"
  );

  resultEditorState = resetFontAndStyles(resultEditorState);

  if (style) {
    resultEditorState = RichUtils.toggleInlineStyle(resultEditorState, style);
  }

  switch (font) {
    case "header-one":
      resultEditorState = RichUtils.toggleBlockType(
        resultEditorState,
        "header-one"
      );
      break;

    case "CODE":
      resultEditorState = RichUtils.toggleCode(resultEditorState);
      break;

    default:
      break;
  }

  return resultEditorState;
};

export const resetFontAndStyles = (editorState) => {
  let resultEditorState = editorState;
  const { blockType } = getEditorData(resultEditorState);

  const appliedStyles = resultEditorState.getCurrentInlineStyle();
  STYLES.forEach((style) => {
    if (appliedStyles.has(style)) {
      resultEditorState = RichUtils.toggleInlineStyle(resultEditorState, style);
    }
  });

  if (blockType === "header-one") {
    resultEditorState = RichUtils.toggleBlockType(
      resultEditorState,
      "header-one"
    );
  }
  if (blockType === "code-block") {
    resultEditorState = RichUtils.toggleCode(resultEditorState);
  }

  return resultEditorState;
};
