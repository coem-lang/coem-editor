var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},i=t.parcelRequire34c6;null==i&&((i=function(t){if(t in e)return e[t].exports;if(t in n){var i=n[t];delete n[t];var s={id:t,exports:{}};return e[t]=s,i.call(s.exports,s,s.exports),s.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){n[t]=e},t.parcelRequire34c6=i);var s,r={},o={};const a=t=>t||"";class c{constructor(t,e,n){this.msg=t,this.startCoordinates=e,this.endCoordinates=n}toString(){return this.msg}}class h extends c{constructor(t,e){super(`${a(e.lexeme&&`at "${e.lexeme}": `)}${t}`,e.startCoordinates,e.endCoordinates)}}var l=(s={error:(t,e,n)=>{new c(t,e,n)},CoemError:c,ReturnError:class{constructor(t){this.value=t}},runtimeError:(t,e)=>new h(t,e),parseError:(t,e)=>e.type===e.EOF?new c(t,e.startCoordinates,e.endCoordinates):new c(`${a(e.lexeme&&`at "${e.lexeme}": `)}${t}`,e.startCoordinates,e.endCoordinates),formatCoemError:(t,e)=>{if(t instanceof c){const n=e.lastIndexOf("\n",t.startCoordinates.index),i=n<0?0:n,s=e.substring(i,t.startCoordinates.index),r=e.substring(t.startCoordinates.index,t.endCoordinates.index),o=e.indexOf("\n",t.endCoordinates.index),a=o<0?e.length:o,c=e.substring(t.endCoordinates.index,a);return{oneLiner:`${t instanceof h?"Runtime Error":"Parse Error"}: ${t.toString()} at ${t.endCoordinates.line}:${t.endCoordinates.col+1}`,preErrorSection:s,errorSection:r,postErrorSection:c}}return{oneLiner:`Unexpected JavaScript. Error: ${t}`}}}).CoemError;const u=()=>{},m="\n  COLON,\n  COMMA, DOT,\n  EMDASH,\n  AMPERSAND,\n  POUND,\n\n  IDENTIFIER, STRING,\n\n  AND, OR,\n  IS, AM, ARE,\n  IF, ELSE, WHILE,\n  LET, BE,\n  TO, \n  TRUE, FALSE, NOTHING,\n  NOT,\n\n  NEWLINE,\n\n  EOF\n".split(",").map((t=>t.trim()));let d={};m.forEach(((t,e)=>{d[t]=e}));const p={and:d.AND,or:d.OR,is:d.IS,am:d.AM,are:d.ARE,not:d.NOT,true:d.TRUE,false:d.FALSE,nothing:d.NOTHING,let:d.LET,be:d.BE,to:d.TO,if:d.IF,else:d.ELSE,while:d.WHILE},E={"—":t=>{t.addToken(d.EMDASH)},":":t=>{t.addToken(d.COLON)},",":t=>{t.addToken(d.COMMA)},".":t=>{t.addToken(d.DOT)},"&":t=>{t.addToken(d.AMPERSAND)},"#":t=>{t.addToken(d.POUND)},"†":t=>{for(;"\n"!==t.peek()&&""!==t.peek();)t.advance()}," ":u,"\t":u,"\r":u,"\n":t=>{t.addToken(d.NEWLINE),t.newline()},"“":t=>{t.handleStringLiterals()}},f=t=>t>="A"&&t<="Z"||t>="a"&&t<="z"||"("==t||")"==t||"["==t||"]"==t||"|"==t||"?"==t||"*"==t||"+"==t;class v{constructor(t,e,n){this.col=t,this.line=e,this.index=n}}class w{constructor(t,e,n,i,s){this.type=t,this.lexeme=e,this.literal=n,this.startCoordinates=s,this.endCoordinates=i}}o=class{static get tokens(){return m}static get tokenEnum(){return d}constructor(t){this.source=t,this.length=t.length,this.tokens=[],this.startPosition=null,this.column=0,this.start=0,this.line=1,this.current=0}handleStringLiterals(){for(;"”"!==this.peek()&&""!==this.peek();)"\n"===this.peek()&&this.newline(),this.advance();if(""===this.peek())throw new l("Unfinished string",this.startPosition,this.endPosition);this.advance();const t=this.source.substring(this.start+1,this.current-1);this.addToken(d.STRING,t)}handleIdentifiers(){for(;f(this.peek());)this.advance();const t=this.source.substring(this.start,this.current);p[t]?this.addToken(p[t],t):this.addToken(d.IDENTIFIER,t)}scanTokens(){for(;this.current<this.length;){const t=this.advance();if(this.startPosition=new v(this.column-1,this.line,this.current-1),E[t])E[t](this);else{if(!f(t))throw new l(`Unexpected character ${t}`,this.startPosition,new v(this.column,this.line,this.current));this.handleIdentifiers()}this.start=this.current}return this.addToken(d.EOF),this.tokens}get endPosition(){return new v(this.column-1,this.line,this.current)}addToken(t,e=null){const n=this.source.substring(this.start,this.current);this.tokens.push(new w(t,n,e,new v(this.column,this.line,this.current),this.startPosition))}increment(){this.current++,this.column++}newline(){this.line++,this.column=0}advance(){return this.increment(),this.source.charAt(this.current-1)}peek(){return this.source.charAt(this.current)}nextMatch(t){return this.peek()===t&&(this.increment(),!0)}};var S,k={};class g{constructor(t,e,n){this.left=t,this.operator=e,this.right=n}}var x=(S={Var:class{constructor(t){this.name=t}},Binary:g,Unary:class{constructor(t,e){this.operator=t,this.right=e}},Block:class{constructor(t){this.statements=t}},Call:class{constructor(t,e,n){this.callee=t,this.paren=e,this.arguments=n}},While:class{constructor(t,e){this.condition=t,this.body=e}},Literal:class{constructor(t){this.value=t}},Return:class{constructor(t,e){this.keyword=t,this.value=e}},Logical:class extends g{},CoemFunction:class{constructor(t,e,n){this.name=t,this.params=e,this.bodyStatements=n}},Condition:class{constructor(t,e,n){this.condition=t,this.thenBranch=e,this.elseBranch=n}},ExpressionStatement:class{constructor(t){this.expression=t}},VarStatement:class{constructor(t,e){this.name=t,this.value=e}},Directive:class{constructor(t,e){this.name=t,this.value=e}}}).Binary,N=S.Unary,T=S.Var,L=S.Call,I=S.Literal,C=S.While,y=S.Return,A=S.CoemFunction,O=S.ExpressionStatement,D=S.VarStatement,R=S.Logical,M=S.Block,B=S.Condition,b=s.parseError;const F=o.tokenEnum;k=class{constructor(t){this.tokens=t,this.current=0,this.isParamListStarted=!1}parse(){let t=[];for(;!this.isAtEnd;){for(;this.check(F.NEWLINE);)this.consume(F.NEWLINE,"Expect newline between statements.");t.push(this.declaration())}return t}declaration(){return this.match(F.POUND)?this.directive():this.match(F.TO)?this.function():this.match(F.LET)?this.varDeclaration():this.statement()}directive(){if(this.match(F.IDENTIFIER,F.BE)){const t=this.previous(),e=this.consume(F.IDENTIFIER,"Expect value after directive name.");return new DirectiveStatement(t,e)}}function(){const t=this.consume(F.IDENTIFIER,"Expect function name.");this.consume(F.EMDASH,"Expect '—' after function name.");let e=[];if(!this.check(F.EMDASH))do{if(e.length>=255)throw b("Can't have more than 255 arguments.",this.peek());e.push(this.consume(F.IDENTIFIER,"Expect identifier name."))}while(this.match(F.COMMA));this.consume(F.EMDASH,"Expect '—' after arguments."),this.consume(F.COLON,"Expect ':' before function body.");const n=this.block();return new A(t,e,n)}block(){let t=[];for(;this.check(F.NEWLINE);)this.consume(F.NEWLINE,"Expect newline between statements.");for(;!this.check(F.DOT)&&!this.isAtEnd;){for(;this.check(F.NEWLINE);)this.consume(F.NEWLINE,"Expect newline between statements.");this.check(F.DOT)||this.isAtEnd||t.push(this.declaration())}return this.consume(F.DOT,"Expect '.' after block."),t}varDeclaration(){const t=this.consume(F.IDENTIFIER,"Expected variable name");let e=null;return this.match(F.BE)&&(e=this.expression()),new D(t,e)}expression(){return this.or()}or(){return this.matchBinary("and",R,F.OR)}and(){return this.matchBinary("equality",R,F.AND)}matchBinary(t,e,...n){let i=this[t]();for(;this.match(...n);){i=new e(i,this.previous(),this[t]())}return i}equality(){let t=this.unary();for(;this.match(F.IS,F.AM,F.ARE);){const e=this.previous(),n=this.unary();t=new x(t,e,n)}return t}unary(){if(this.match(F.NOT)){const t=this.previous(),e=this.unary();return new N(t,e)}return this.call()}call(){let t=this.primary();if(!this.isParamListStarted)for(;this.match(F.EMDASH);)t=this.finishCall(t);return t}primary(){if(this.match(F.FALSE))return new I(!1);if(this.match(F.TRUE))return new I(!0);if(this.match(F.NOTHING))return new I(null);if(this.match(F.STRING))return new I(this.previous().literal);if(this.match(F.IDENTIFIER))return new T(this.previous());throw b("Expect expression.",this.peek())}finishCall(t){let e=[];if(!this.check(F.EMDASH))do{if(e.length>=255)throw b("Can't have more than 255 arguments.",this.peek());this.isParamListStarted=!0,e.push(this.expression()),this.isParamListStarted=!1}while(this.match(F.COMMA));const n=this.consume(F.EMDASH,"Expect '—' after arguments.");return new L(t,n,e)}statement(){return this.match(F.IF)?this.ifStatement():this.match(F.AMPERSAND)?this.returnStatement():this.match(F.WHILE)?this.whileStatement():this.match(F.COLON)?new M(this.block()):this.expressionStatement()}ifStatement(){this.consume(F.EMDASH,"Expect '—' after 'if'."),this.isParamListStarted=!0;const t=this.expression();this.consume(F.EMDASH,"Expect '—' after if condition."),this.isParamListStarted=!1;const e=this.statement();let n=null;return this.match(F.ELSE)&&(n=this.statement()),new B(t,e,n)}returnStatement(){const t=this.previous();let e=null;return this.check(F.NEWLINE)||(e=this.expression()),new y(t,e)}whileStatement(){this.consume(F.EMDASH,"Expect '—' after 'while'."),this.isParamListStarted=!0;const t=this.expression();this.consume(F.EMDASH,"Expect '—' after condition."),this.isParamListStarted=!1;const e=this.statement();return new C(t,e)}expressionStatement(){const t=this.expression();let e=t;if(t instanceof L){t.callee.name}else e=printExpression(t);return new O(e)}printExpression(t){const e=new Token(F.IDENTIFIER,"print",null,peek().endCoordinates,peek().startCoordinates),n=new T(e),i=new Token(F.emdash,"—",NULL,peek().endCoordinates,peek().startCoordinates);return new L(n,i,[t])}consume(t,e){if(this.check(t))return this.advance();throw b(e,this.peek())}match(...t){for(let e of t)if(this.check(e))return this.advance(),!0;return!1}check(t){return!this.isAtEnd&&this.peek().type===t}get isAtEnd(){return this.peek().type===F.EOF}peek(){return this.tokens[this.current]}previous(){if(this.current<=0)throw b("Expected previous but found nothing.",this.peek());return this.tokens[this.current-1]}advance(){return this.isAtEnd||this.current++,this.previous()}};var P={},H=s.runtimeError,U=s.ReturnError,W=S.Binary,$=S.Unary,V=S.Call,q=S.Literal,_=S.Logical,G=S.Var,z=S.Return,J=S.While,Z=S.Block,j=S.CoemFunction,K=S.ExpressionStatement,Q=S.VarStatement,X=S.Condition,Y={},tt=s.runtimeError;Y=class{constructor(t=null){this.values=new Map,this.enclosing=t}get(t){const e=this.getSet(t.name.lexeme);if(e)return e[1];if(this.enclosing)return this.enclosing.get(t);throw tt(`Undefined variable '${t.name.lexeme}'.`,t.name)}getSet(t){for(const[e,n]of this.values.entries())if(e.test(t))return[e,n];return null}set(t,e){return this.setNameValue(t.lexeme,e)}setNameValue(t,e){let n=new RegExp(t),i=this.getSet(t);if(i)return this.values.set(i[0],e);if(this.enclosing){if(this.enclosing.getSet(t))return this.enclosing.setNameValue(t,e)}return this.values.set(n,e)}setBuiltin(t,e){this.setNameValue(t,e)}};const et=o.tokenEnum,nt=t=>Boolean(t);class it{constructor(t,e){this.declaration=t,this.closure=e}call(t,e){const n=new Y(this.closure);for(let t=0;t<this.declaration.params.length;t++)n.set(this.declaration.params[t],e[t]);try{t.interpretBlock(this.declaration.bodyStatements,n)}catch(t){if(t instanceof U)return t.value;throw t}return null}toString(){return`<${this.declaration.name.lexeme}()>`}}r={run:function(t,e,n,i=!1){const s=new o(t).scanTokens();i&&console.log(s);const r=new k(s).parse();i&&console.log(r);const a=new P(e,n);let c;for(let t of r)c=a.interpret(t);return c},parse:function(t){const e=new o(t).scanTokens();return new k(e).parse()},Parser:k,Tokenizer:o,Interpreter:P=class{constructor(t,e=console.log){this.printfunction=e,this.environment=t||new Y,this.environment.setBuiltin("clock",(()=>(new Date).getTime()));const n=t=>{null===t[0]?this.printfunction("nothing"):this.printfunction(...t)};this.environment.setBuiltin("print",n),this.environment.setBuiltin("know",n),this.environment.setBuiltin("say",n)}interpret(t){return this.evaluate(t)}evaluate(t){return t instanceof Z?this.visitBlock(t):t instanceof j?this.visitFunction(t):t instanceof _?this.visitLogical(t):t instanceof V?this.visitCall(t):t instanceof J?this.visitWhile(t):t instanceof X?this.visitCondition(t):t instanceof Q?this.visitVarStatement(t):t instanceof z?this.visitReturnStatement(t):t instanceof K?this.visitExpressionStmt(t):t instanceof G?this.visitVar(t):t instanceof q?this.visitLiteral(t):t instanceof $?this.visitUnary(t):t instanceof W?this.visitBinary(t):void 0}visitLiteral(t){return t.value}visitExpressionStmt(t){return this.evaluate(t.expression)}visitPrintStatement(t){const e=this.evaluate(t.expression);return this.printfunction(null===e?"nil":e.toString()),e}visitFunction(t){const e=new it(t,this.environment);this.environment.set(t.name,e)}visitLogical(t){const e=this.evaluate(t.left);if(t.operator.type===et.OR){if(nt(e))return e}else if(!nt(e))return e;return this.evaluate(t.right)}visitWhile(t){for(;nt(this.evaluate(t.condition));)this.evaluate(t.body);return null}visitReturnStatement(t){var e=null;throw t.value&&(e=this.evaluate(t.value)),new U(e)}visitVar(t){return this.environment.get(t)}visitVarStatement(t){let e=null;return null!==t.value&&(e=this.evaluate(t.value)),this.environment.set(t.name,e),null}visitBlock(t){return this.interpretBlock(t.statements,new Y(this.environment)),null}visitCondition(t){return nt(this.evaluate(t.condition))?this.evaluate(t.thenBranch):t.elseBranch&&this.evaluate(t.elseBranch),null}interpretBlock(t,e){const n=this.environment;try{this.environment=e;for(let e of t)this.interpret(e);this.environment=n}catch(t){throw this.environment=n,t}}visitCall(t){const e=this.evaluate(t.callee);let n=t.arguments.map((t=>this.evaluate(t)));if(!e.call)throw H("Can only call functions.",t.paren);return e.call(this,n)}visitUnary(t){const e=this.evaluate(t.right);if(t.operator.type===NOT)return!nt(e)}visitBinary(t){const e=this.evaluate(t.left),n=this.evaluate(t.right);switch(t.operator.type){case et.IS:case et.AM:case et.ARE:return e===n}}},Environment:Y};var st=i("ktww2");document.querySelectorAll(".nav__item > button");const rt=document.querySelector(".output"),ot=document.querySelector(".console"),at=(document.querySelector("h2 .filename-title"),document.querySelector(".toc__items"),document.querySelectorAll(".toc__item button"),document.querySelector("#newBtn"),document.querySelector("#draftBtn"));let ct="";function ht(t,e=""){if(!t)return ot.innerHTML="",null;console.error(t);const{oneLiner:n,preErrorSection:i,errorSection:r,postErrorSection:o}=s.formatCoemError(t,e);let a=n;r&&(a+="<br />",a+=`${i}<span class="error">${r}</span>${o}`),ot.innerHTML=a}function lt(t){ct+=t+"\n",console.log(t),rt.innerHTML=ct}function ut(){const t=st.view.state.doc.toString();console.log(t);const e=new r.Environment;ct="";try{r.run(t,e,lt),ht(null)}catch(e){ht(e,t)}}document.addEventListener("DOMContentLoaded",(()=>{at.addEventListener("click",ut)}));
//# sourceMappingURL=index.ea5eafed.js.map
