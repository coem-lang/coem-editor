import { HighlightStyle, tags } from '@codemirror/highlight';

export const myHighlightStyle = HighlightStyle.define([
  {tag: [tags.keyword, tags.bool, tags.null],
    fontStyle: "italic"},
  {tag: [tags.string, tags.deleted],
    fontFamily: "IBM Plex Sans"},
  {tag: [tags.regexp, tags.string],
    fontFamily: "IBM Plex Sans"},
  {tag: [tags.variableName],
    fontFamily: "IBM Plex Mono"},
  {tag: tags.comment,
    fontStyle: "italic", opacity: 0.5}
])