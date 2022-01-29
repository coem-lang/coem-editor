import { ExternalTokenizer, ContextTracker, LRParser } from '@lezer/lr';
import { NodeProp } from '@lezer/common';
import { LRLanguage, indentNodeProp, delimitedIndent, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@codemirror/highlight';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const indent = 40,
  dedent = 41,
  newline$1 = 42,
  newlineBracketed = 43,
  newlineEmpty = 44,
  eof = 45,
  ArgList = 9,
  ParamList = 33;

const newline = 10, carriageReturn = 13, space = 32, tab = 9, hash = 35;

const bracketed = [
  ArgList, ParamList
];

const newlines = new ExternalTokenizer((input, stack) => {
  if (input.next < 0) {
    input.acceptToken(eof);
  } else if (input.next != newline && input.next != carriageReturn) ; else if (stack.context.depth < 0) {
    input.acceptToken(newlineBracketed, 1);
  } else {
    input.advance();
    let spaces = 0;
    while (input.next == space || input.next == tab) { input.advance(); spaces++; }
    let empty = input.next == newline || input.next == carriageReturn || input.next == hash;
    input.acceptToken(empty ? newlineEmpty : newline$1, -spaces);
  }
}, {contextual: true, fallback: true});

const indentation = new ExternalTokenizer((input, stack) => {
  let cDepth = stack.context.depth;
  if (cDepth < 0) return
  let prev = input.peek(-1);
  if ((prev == newline || prev == carriageReturn) && stack.context.depth >= 0) {
    let depth = 0, chars = 0;
    for (;;) {
      if (input.next == space) depth++;
      else if (input.next == tab) depth += 8 - (depth % 8);
      else break
      input.advance();
      chars++;
    }
    if (depth != cDepth &&
        input.next != newline && input.next != carriageReturn && input.next != hash) {
      if (depth < cDepth) input.acceptToken(dedent, -chars);
      else input.acceptToken(indent);
    }
  }
});

function IndentLevel(parent, depth) {
  this.parent = parent;
  // -1 means this is not an actual indent level but a set of brackets
  this.depth = depth;
  this.hash = (parent ? parent.hash + parent.hash << 8 : 0) + depth + (depth << 4);
}

const topIndent = new IndentLevel(null, 0);

const trackIndent = new ContextTracker({
  start: topIndent,
  reduce(context, term) {
    return context.depth < 0 && bracketed.indexOf(term) > -1 ? context.parent : context
  },
  shift(context, term, stack, input) {
    if (term == indent) return new IndentLevel(context, stack.pos - input.pos)
    if (term == dedent) return context.parent
    // if (term == ParenL || term == BracketL || term == BraceL) return new IndentLevel(context, -1)
    return context
  },
  hash(context) { return context.hash }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_identifier = {__proto__:null,nothing:14, true:16, false:16, or:22, and:24, is:26, am:28, are:30, not:32, if:38, else:40, let:44, be:46, while:60, to:64};
const parser = LRParser.deserialize({
  version: 13,
  states: "-UO`QYOOO!TQ[O'#C_OOQW'#Ca'#CaOOQW'#Dc'#DcO!YQYO'#CtO!eQYO'#CuOOQW'#D`'#D`O!sQYO'#D_OOQW'#Dk'#DkOOQW'#D^'#D^OOQW'#DO'#DOQ`QYOOO!eQYO'#CqO!{QYO'#CvO#QQYO'#CyO!nQYO'#C{OOQW,58y,58yO#hQYO'#CeOOQW,58z,58zOOQW,59a,59aOOQW,59y,59yOOQW-E6|-E6|O#oQYO,59]O#VQYO,59bO#VQYO,59eO#zQYO,59gOOQW'#Dh'#DhO$bQYO'#DgOOQW'#Dg'#DgOOQW,59P,59PO$uQYO,59PO#VQYO'#CmO$zQYO'#DfO!eQYO1G.wO%SQYO'#DlOOQW'#Dl'#DlO%_QYO1G.|O%dQYO1G/PO%iQYO'#C}O%qQYO1G/RO#VQYO,59QO#VQYO,59QO%vQYO,59QO#VQYO,59YOOQW1G.k1G.kO&XQYO,59XO&oQYO,5:QO#VQYO'#DPOOQW7+$c7+$cO#VQYO,59cO%qQYO7+$hO%qQYO7+$kOOQW,59i,59iO&wQYO,59iO&|QYO'#DoO'UQYO'#CxOOQW7+$m7+$mO'{QYO1G.lO(SQYO1G.lOOQW1G.l1G.lO#VQYO1G.lO(ZQYO1G.tOOQW-E6}-E6}OOQW,59k,59kOOQW1G.}1G.}O(bQYO<<HSOOQW<<HV<<HVOOQW1G/T1G/TO)`QYO,5:ZO!nQYO'#DSO)hQZO,59dOOQW7+$W7+$WO#VQYO7+$`O)mQYOAN=nO*kQYOAN=nOOQW-E7Q-E7QOOQW,59n,59nO*sQYO1G/OOOQW<<Gz<<GzOOQW-E7P-E7PO*kQYOG23YO+eQYO,59mOOQWG23YG23YOOQW'#DQ'#DQO+lQYO7+$jP+sQYO'#DROOQWLD(tLD(tOOQW1G/X1G/XO%qQYO1G/XOOQW-E7O-E7OO+xQZO<<HUOOQW7+$s7+$sOOQWAN=pAN=p",
  stateData: ",Q~O!POS|OS{OSPOS~OUROVROWROc]Of[On^Op_OzYO!TPO!WQO!^TO~O!U`O~O!XaOzhX}hX~OUROVROWRO!WQO~OzdO}dO~O!XgO~O!XhO~OUROVROWRO`oO!WQO~O!XmO~P#VOgqOzea}ea~O!XvO~OZxO[yO]zO^zO_zO~Oc{O!X!ZX!]!ZXg!ZX!a!ZX~P$PO!X|O~O!]!PO!X!YX~Og!RO!X!`X!a!`X~O!X!SO~O!X!TO~O!WQO!X!UO~O!a!XO~OUROVROWRO`!^O!WQO~Ocaa!Xaa!]aagaadaa!aaa~P$PO!]!PO!X!Ya~O!X!eO~O!]!gO!X!cX~Oz!hO~O]zO^zO_zOZYicYi!XYi!]YigYidYi!aYi~O[yO~P'ZO[Yi~P'ZOd!jO~P$POd!lOUjyVjyWjycjyfjynjypjywjyzjy!Tjy!Wjy!^jy!bjy~O!]!gO!X!ca~Ox!oO~Od!rOUj!RVj!RWj!Rcj!Rfj!Rnj!Rpj!Rwj!Rzj!R!Tj!R!Wj!R!^j!R!bj!R~Oc!sO!a!XO~OUROVROWROc]Of[On^Op_O!TPO!WQO!^TO~O!a!XO~P#VO!b!|O~P*sOc!sO~Oy#OO}#OO~O",
  goto: "'m!dPPP!e!e!kPPP#[#_PPPPPP#_#nPP!ePP!e!e#w#}$S#wP#wP$i$l$r$x%O%UPPPPPPPPP%[%d%jPP%pPP&`&c&tPP%d'aPP'jXUOZ!o!vxROTZ[aghoqxyz{!P!R!^!j!o!s!vQi_Q!WvR!n!gRbSkjaghoxyz{!P!R!^!j!s_lagh!P!R!j!sXWOZ!o!vVsgh!sQ!YwQ!c!SQ!d!TQ!t!lQ!x!rQ!y!sR!}!zRwiQZOReZQ!OpR!`!OQ!v!oR!{!vQ!k!cR!q!kQ!f!WR!m!fSYOZT!u!o!vXXOZ!o!vXVOZ!o!vWSOZ!o!vQcTQf[jjaghoxyz{!P!R!^!j!sR!QqRnaQpaUrgh!sQ!a!PQ!b!RR!p!j^kagh!P!R!j!sQ}oQ!ZxQ![yQ!]zQ!_{R!i!^QtgQuhR!z!sR!Vv",
  nodeNames: "⚠ Comment Script DirectiveStatement CallExpression VariableName String Nothing Boolean ArgList BinaryExpression or and is am are not UnaryExpression ConditionalExpression if else AssignStatement let be ExpressionStatement ReturnStatement IfStatement NamedExpression Body WhileStatement while FunctionDefinition to ParamList",
  maxTerm: 65,
  context: trackIndent,
  nodeProps: [
    [NodeProp.group, -4,5,6,7,8,"Expression"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 5,
  tokenData: "&c~RfXY!g[]!gpq!gst#Rvw#axy#fyz#fz{#f{|#f|}$Z!O!P$`![!]$e!a!b#f!c!}#f!}#O#f#O#P!x#P#Q#f#T#o$j#p#q#f$Ih$Ii%a$Ip$Iq%f$It$Iu&T~!lS!P~XY!g[]!gpq!g#O#P!x~!{QYZ!g]^!g~#UP#T#o#X~#^P!T~#T#o#X~#fO!^~P#kY!WPxy#fyz#fz{#f{|#f!a!b#f!c!}#f!}#O#f#P#Q#f#T#o#f#p#q#f~$`O!]~~$eO!b~~$jO!a~R$qY!WP!UQxy#fyz#fz{#f{|#f!a!b#f!c!}#f!}#O#f#P#Q#f#T#o$j#p#q#f~%fO!X~~%iTO$Iq%f$Iq$Ir%x$Ir$It%f$It$Iu%}$Iu~%f~%}OU~~&QPO~%f~&YRP~OY&TZ]&T^~&T",
  tokenizers: [indentation, 0, 1, newlines],
  topRules: {"Script":[0,2]},
  specialized: [{term: 54, get: value => spec_identifier[value] || -1}],
  tokenPrec: 0
});

// https://github.com/codemirror/lang-python/blob/main/src/python.ts
function indentBody(context, node) {
    let base = context.lineIndent(node.from);
    let line = context.lineAt(context.pos, -1), to = line.from + line.text.length;
    // Don't consider blank, deindented lines at the end of the
    // block part of the block
    if (!/\S/.test(line.text) &&
        context.node.to < to + 100 &&
        !/\S/.test(context.state.sliceDoc(to, context.node.to)) &&
        context.lineIndent(context.pos, -1) <= base)
        return null;
    // A normally deindenting keyword that appears at a higher
    // indentation than the block should probably be handled by the next
    // level
    if (/^\s*(else:|else if:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base)
        return null;
    return base + context.unit;
}
/// A language provider based on the Coem parser,
/// extended with highlighting and indentation information.
const coemLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Body: context => { var _a; return (_a = indentBody(context, context.node)) !== null && _a !== void 0 ? _a : context.continue(); },
                IfStatement: cx => /^\s*(else:|else if:)/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
                "ParamList ArgList": delimitedIndent({ closing: "—" }),
                Script: context => {
                    if (context.pos + /\s*/.exec(context.textAfter)[0].length >= context.node.to) {
                        let endBody = null;
                        for (let cur = context.node, to = cur.to;;) {
                            cur = cur.lastChild;
                            if (!cur || cur.to != to)
                                break;
                            if (cur.type.name == "Body")
                                endBody = cur;
                        }
                        if (endBody) {
                            let bodyIndent = indentBody(context, endBody);
                            if (bodyIndent != null)
                                return bodyIndent;
                        }
                    }
                    return context.continue();
                }
            }),
            styleTags({
                "while if else": tags.controlKeyword,
                "not and or is am are": tags.operatorKeyword,
                "let to": tags.definitionKeyword,
                "be": tags.operatorKeyword,
                "print": tags.keyword,
                Boolean: tags.bool,
                Nothing: tags.null,
                VariableName: tags.variableName,
                "CallExpression/VariableName": tags.function(tags.definition(tags.variableName)),
                "FunctionDefinition/VariableName": tags.function(tags.definition(tags.variableName)),
                Comment: tags.lineComment,
                DirectiveStatement: tags.lineComment,
                String: tags.string,
                "—": tags.bracket,
                ",": tags.separator
            })
        ],
        strict: false
    }),
    languageData: {
        commentTokens: { line: "†" },
        indentOnInput: /^\s*([\}\]\)]|else:|else if:)$/
    }
});
/// Coem language support.
function coem() {
    return new LanguageSupport(coemLanguage);
}

export { coem, coemLanguage };
