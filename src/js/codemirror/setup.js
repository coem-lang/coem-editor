import {EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor, ViewPlugin} from "@codemirror/view"
import {EditorState} from "@codemirror/state"
import {history, historyKeymap} from "@codemirror/history"
import {indentOnInput, indentUnit} from "@codemirror/language"
import {indentWithTab} from "@codemirror/commands"
import {lineNumbers, highlightActiveLineGutter} from "@codemirror/gutter"
import {defaultKeymap} from "@codemirror/commands"
// import {bracketMatching} from "@codemirror/matchbrackets"
import {bracketMatching} from "./matchbrackets"
// import {closeBrackets, closeBracketsKeymap} from "@codemirror/closebrackets"
import {closeBrackets, closeBracketsKeymap} from "./closebrackets"
import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
import {commentKeymap} from "@codemirror/comment"
import {rectangularSelection} from "@codemirror/rectangular-selection"
import {lintKeymap} from "@codemirror/lint"
import { coem } from './lang-coem';
import { myTheme } from './theme';
import { myHighlightStyle } from './highlight';

const initialState = EditorState.create({
  doc: '† this is a reminder\n\
\n\
to breathing——:\n\
    † in and out, and thus to\n\
    know—myself—\n\
    & nothing.\n\
\n\
let me|myself|I be “present”\n\
while—I am “present”—:\n\
    let me be breathing——.',
  extensions: [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching({
      brackets: "“”——()[]"
    }),
    closeBrackets(),
    rectangularSelection(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...commentKeymap,
      ...lintKeymap,
      indentWithTab
    ]),
    indentUnit.of("    "),
    coem(),
    myTheme,
    myHighlightStyle
  ]
});

const view = new EditorView({
  parent: document.getElementById('editor'),
  state: initialState
});

// view.dispatch({
//   changes: {from: 0, insert: "#!/usr/bin/env node\n"}
// });

// let text = view.state.doc.toString(), pos = 0;
// let changes = [];
// for (let next; (next = text.indexOf("amongus", pos)) > -1;) {
//   changes.push({from: next, to: next + 1, insert: "AMONGUS"});
//   pos = next + 1;
// }
// view.dispatch({changes});

export { view };