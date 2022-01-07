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
  }
});