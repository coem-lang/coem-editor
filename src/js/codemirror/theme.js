import { EditorView } from "@codemirror/basic-setup";

export const myTheme = EditorView.baseTheme({
  ".cm-content": {
    fontFamily: "IBM Plex Serif",
    fontSize: "24px"
  },
  "&": {
    backgroundColor: "#f9f9f9",
    padding: "1em"
  },
  ".cm-scroller": {
    overflow: "auto"
  },
  ".cm-gutters": {
    background: "none !important",
    borderRight: "0 !important",
    fontSize: "12px",
    // fontFamily: "Georgia", // Georgia for oldstyle figures, until implemented in IBM Plex https://github.com/IBM/plex/issues/418
    fontFamily: 'IBM Plex Serif',
    lineHeight: "28px"
  },
  ".cm-gutterElement": {
    padding: "2px 20px 0 5px !important",
    color: "#646464"
  },
  ".cm-selectionMatch": {
    backgroundColor: "#e9e8f2 !important"
  }
});