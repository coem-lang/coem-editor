import { EditorView } from "@codemirror/basic-setup";

export const myTheme = EditorView.baseTheme({
  ".cm-content": {
    fontFamily: "IBM Plex Serif",
    fontSize: "24px"
  },
  "&": {
    // width: "500px",
    // height: "300px"
    backgroundColor: "#f9f9f9",
    padding: "1em"
  },
  ".cm-scroller": {
    overflow: "auto"
  },
  ".cm-gutters": {
    color: "#000 !important",
    background: "none !important",
    borderRight: "0 !important",
    fontSize: "12px",
    fontFamily: "Georgia", // Georgia for oldstyle figures, until implemented in IBM Plex https://github.com/IBM/plex/issues/418
    lineHeight: "26px"
  },
  ".cm-gutterElement": {
    padding: "2px 20px 0 5px !important"
  },
  "&.cm-focused .cm-matchingBracket, & .cm-matchingBracket": {
    backgroundColor: "#00000011 !important"
  }
});