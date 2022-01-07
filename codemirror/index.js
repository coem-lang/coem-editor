import { basicSetup } from './setup';
import { EditorState, EditorView } from '@codemirror/basic-setup';
import { coem } from './coem';
import { myTheme } from './theme';
import { myHighlightStyle } from './highlight';

const initialState = EditorState.create({
  doc: '',
  extensions: [
    basicSetup,
    coem(),
    myTheme,
    myHighlightStyle
  ]
});

const view = new EditorView({
  parent: document.getElementById('editor'),
  state: initialState
})