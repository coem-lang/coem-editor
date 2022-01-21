import { ExternalTokenizer, ContextTracker, LRParser } from '@lezer/lr';
import { NodeProp } from '@lezer/common';
import { LRLanguage, indentNodeProp, delimitedIndent, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@codemirror/highlight';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const indent = 39,
  dedent = 40,
  newline$1 = 41,
  newlineBracketed = 42,
  newlineEmpty = 43,
  eof = 44,
  ArgList = 8,
  ParamList = 32;

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
const spec_identifier = {__proto__:null,nothing:12, true:14, false:14, or:20, and:22, is:24, am:26, are:28, not:30, if:36, else:38, let:42, be:44, while:58, to:62};
const parser = LRParser.deserialize({
  version: 13,
  states: ",xO`QUOOOOQS'#C`'#C`OOQS'#D`'#D`O!QQUO'#CsO!]QUO'#CtOOQS'#D_'#D_O!kQUO'#D^OOQS'#Dh'#DhOOQS'#D]'#D]OOQS'#C}'#C}Q`QUOOO!]QUO'#CpO!sQUO'#CuO!xQUO'#CxO!fQUO'#CzO#`QUO'#CdOOQS,58y,58yOOQS,59`,59`OOQS,59x,59xOOQS-E6{-E6{O#gQUO,59[O!}QUO,59aO!}QUO,59dO#rQUO,59fOOQS'#De'#DeO$YQUO'#DdOOQS'#Dd'#DdOOQS,59O,59OO$mQUO,59OO!}QUO'#ClO$rQUO'#DcO!]QUO1G.vO$zQUO'#DiOOQS'#Di'#DiO%VQUO1G.{O%[QUO1G/OO%aQUO'#C|O%iQUO1G/QO!}QUO,59PO!}QUO,59PO%nQUO,59PO!}QUO,59XOOQS1G.j1G.jO&PQUO,59WO&gQUO,59}O!}QUO'#DOOOQS7+$b7+$bO!}QUO,59bO%iQUO7+$gO%iQUO7+$jOOQS,59h,59hO&oQUO,59hO&tQUO'#DlO&|QUO'#CwOOQS7+$l7+$lO'sQUO1G.kO'zQUO1G.kOOQS1G.k1G.kO!}QUO1G.kO(RQUO1G.sOOQS-E6|-E6|OOQS,59j,59jOOQS1G.|1G.|O(YQUO<<HROOQS<<HU<<HUOOQS1G/S1G/SO)TQUO,5:WO!fQUO'#DRO)]QVO,59cOOQS7+$V7+$VO!}QUO7+$_O)bQUOAN=mO*]QUOAN=mOOQS-E7P-E7POOQS,59m,59mO*eQUO1G.}OOQS<<Gy<<GyOOQS-E7O-E7OO*]QUOG23XO+SQUO,59lOOQSG23XG23XOOQS'#DP'#DPO+ZQUO7+$iP+bQUO'#DQOOQSLD(sLD(sOOQS1G/W1G/WO%iQUO1G/WOOQS-E6}-E6}O+gQVO<<HTOOQS7+$r7+$rOOQSAN=oAN=o",
  stateData: "+o~O!OOS{OSzOSPOS~OTQOUQOVQOb[OeZOm]Oo^OyXO!TPO!ZSO~O!U_OygX|gX~OTQOUQOVQO!TPO~OybO|bO~O!UeO~O!UfO~OTQOUQOVQO_mO!TPO~O!UkO~P!}OfoOyda|da~O!UtO~OYvOZwO[xO]xO^xO~ObyO!U!WX!Y!WXf!WX!^!WX~P#wO!UzO~O!Y}O!U!VX~Of!PO!U!]X!^!]X~O!U!QO~O!U!RO~O!TPO!U!SO~O!^!VO~OTQOUQOVQO_![O!TPO~Ob`a!U`a!Y`af`ac`a!^`a~P#wO!Y}O!U!Va~O!U!cO~O!Y!eO!U!`X~Oy!fO~O[xO]xO^xOYXibXi!UXi!YXifXicXi!^Xi~OZwO~P'ROZXi~P'ROc!hO~P#wOc!jOTiyUiyViybiyeiymiyoiyviyyiy!Tiy!Ziy!_iy~O!Y!eO!U!`a~Ow!mO~Oc!pOTi!RUi!RVi!Rbi!Rei!Rmi!Roi!Rvi!Ryi!R!Ti!R!Zi!R!_i!R~Ob!qO!^!VO~OTQOUQOVQOb[OeZOm]Oo^O!TPO!ZSO~O!^!VO~P!}O!_!zO~P*eOb!qO~Ox!|O|!|O~O",
  goto: "'j!aPPP!b!hPPP#X#[PPPPPP#[#kPP!bPP!b!b#t#z$P#tP#tP$f$i$o$u${%RPPPPPPPPP%X%a%g%mPP&]&`&qPP%a'^PP'gXTOY!m!txQOSYZ_efmovwxy}!P![!h!m!q!tQg^Q!UtR!l!eR`Rkh_efmvwxy}!P![!h!q_j_ef}!P!h!qXVOY!m!tVqef!qQ!WuQ!a!QQ!b!RQ!r!jQ!v!pQ!w!qR!{!xRugQYORcYQ|nR!^|Q!t!mR!y!tQ!i!aR!o!iQ!d!UR!k!dSXOYT!s!m!tXWOY!m!tXUOY!m!tWROY!m!tQaSQdZjh_efmvwxy}!P![!h!qR!OoRl_Qn_Upef!qQ!_}Q!`!PR!n!h^i_ef}!P!h!qQ{mQ!XvQ!YwQ!ZxQ!]yR!g![QreQsfR!x!qR!Tt",
  nodeNames: "⚠ Comment Script CallExpression VariableName String Nothing Boolean ArgList BinaryExpression or and is am are not UnaryExpression ConditionalExpression if else AssignStatement let be ExpressionStatement ReturnStatement IfStatement NamedExpression Body WhileStatement while FunctionDefinition to ParamList",
  maxTerm: 62,
  context: trackIndent,
  nodeProps: [
    [NodeProp.group, -4,4,5,6,7,"Expression"]
  ],
  skippedNodes: [0,1],
  repeatNodeCount: 5,
  tokenData: "%Z~ReXY!d[]!dpq!dvw#Oxy#Tyz#Tz{#T{|#T|}#x!O!P#}![!]$S!a!b#T!c!}#T!}#O#T#O#P!u#P#Q#T#T#o#T#p#q#T$Ih$Ii$X$Ip$Iq$^$It$Iu${~!iS!O~XY!d[]!dpq!d#O#P!u~!xQYZ!d]^!d~#TO!Z~~#YY!T~xy#Tyz#Tz{#T{|#T!a!b#T!c!}#T!}#O#T#P#Q#T#T#o#T#p#q#T~#}O!Y~~$SO!_~~$XO!^~~$^O!U~~$aTO$Iq$^$Iq$Ir$p$Ir$It$^$It$Iu$u$Iu~$^~$uOT~~$xPO~$^~%QRP~OY${Z]${^~${",
  tokenizers: [indentation, 0, newlines],
  topRules: {"Script":[0,2]},
  specialized: [{term: 51, get: value => spec_identifier[value] || -1}],
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
                String: tags.string,
                "—": tags.bracket,
                ",": tags.separator
            })
        ],
        strict: false
    }),
    languageData: {
        // closeBrackets: {
        //   brackets: ["(", "[", '"', "“", "—"]
        // },
        commentTokens: { line: "†" },
        indentOnInput: /^\s*([\}\]\)]|else:|else if:)$/
    }
});
/// Coem language support.
function coem() {
    return new LanguageSupport(coemLanguage);
}

export { coem, coemLanguage };