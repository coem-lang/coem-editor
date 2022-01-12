import { EditorView } from "@codemirror/basic-setup";

export const myTheme = EditorView.baseTheme({
  ".cm-content": {
    fontFamily: "IBM Plex Serif"
  },
  "&": {
    width: "500px",
    height: "300px"
  },
  ".cm-scroller": {
    overflow: "auto"
  },
  ".cm-gutters": {
    color: "#000 !important",
    background: "none !important",
    borderRight: "0 !important",
    fontSize: "12px",
    fontFamily: "Georgia"
  },
  ".cm-gutterElement": {
    padding: "2px 5px 0 5px !important"
  }
});