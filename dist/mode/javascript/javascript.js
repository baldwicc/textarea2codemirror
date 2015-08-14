!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";a.defineMode("javascript",function(b,c){function d(a){for(var b,c=!1,d=!1;null!=(b=a.next());){if(!c){if("/"==b&&!d)return;"["==b?d=!0:d&&"]"==b&&(d=!1)}c=!c&&"\\"==b}}function e(a,b,c){return oa=a,pa=c,b}function f(a,b){var c=a.next();if('"'==c||"'"==c)return b.tokenize=g(c),b.tokenize(a,b);if("."==c&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return e("number","number");if("."==c&&a.match(".."))return e("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(c))return e(c);if("="==c&&a.eat(">"))return e("=>","operator");if("0"==c&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),e("number","number");if(/\d/.test(c))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),e("number","number");if("/"==c)return a.eat("*")?(b.tokenize=h,h(a,b)):a.eat("/")?(a.skipToEnd(),e("comment","comment")):"operator"==b.lastType||"keyword c"==b.lastType||"sof"==b.lastType||/^[\[{}\(,;:]$/.test(b.lastType)?(d(a),a.eatWhile(/[gimy]/),e("regexp","string-2")):(a.eatWhile(wa),e("operator","operator",a.current()));if("`"==c)return b.tokenize=i,i(a,b);if("#"==c)return a.skipToEnd(),e("error","error");if(wa.test(c))return a.eatWhile(wa),e("operator","operator",a.current());a.eatWhile(/[\w\$_]/);var f=a.current(),j=va.propertyIsEnumerable(f)&&va[f];return j&&"."!=b.lastType?e(j.type,j.style,f):e("variable","variable",f)}function g(a){return function(b,c){var d,g=!1;if(sa&&"@"==b.peek()&&b.match(xa))return c.tokenize=f,e("jsonld-keyword","meta");for(;null!=(d=b.next())&&(d!=a||g);)g=!g&&"\\"==d;return g||(c.tokenize=f),e("string","string")}}function h(a,b){for(var c,d=!1;c=a.next();){if("/"==c&&d){b.tokenize=f;break}d="*"==c}return e("comment","comment")}function i(a,b){for(var c,d=!1;null!=(c=a.next());){if(!d&&("`"==c||"$"==c&&a.eat("{"))){b.tokenize=f;break}d=!d&&"\\"==c}return e("quasi","string-2",a.current())}function j(a,b){b.fatArrowAt&&(b.fatArrowAt=null);var c=a.string.indexOf("=>",a.start);if(!(0>c)){for(var d=0,e=!1,f=c-1;f>=0;--f){var g=a.string.charAt(f),h=ya.indexOf(g);if(h>=0&&3>h){if(!d){++f;break}if(0==--d)break}else if(h>=3&&6>h)++d;else if(/[$\w]/.test(g))e=!0;else if(e&&!d){++f;break}}e&&!d&&(b.fatArrowAt=f)}}function k(a,b,c,d,e,f){this.indented=a,this.column=b,this.type=c,this.prev=e,this.info=f,null!=d&&(this.align=d)}function l(a,b){for(var c=a.localVars;c;c=c.next)if(c.name==b)return!0;for(var d=a.context;d;d=d.prev)for(var c=d.vars;c;c=c.next)if(c.name==b)return!0}function m(a,b,c,d,e){var f=a.cc;for(Aa.state=a,Aa.stream=e,Aa.marked=null,Aa.cc=f,Aa.style=b,a.lexical.hasOwnProperty("align")||(a.lexical.align=!0);;){var g=f.length?f.pop():ta?w:v;if(g(c,d)){for(;f.length&&f[f.length-1].lex;)f.pop()();return Aa.marked?Aa.marked:"variable"==c&&l(a,d)?"variable-2":b}}}function n(){for(var a=arguments.length-1;a>=0;a--)Aa.cc.push(arguments[a])}function o(){return n.apply(null,arguments),!0}function p(a){function b(b){for(var c=b;c;c=c.next)if(c.name==a)return!0;return!1}var d=Aa.state;if(d.context){if(Aa.marked="def",b(d.localVars))return;d.localVars={name:a,next:d.localVars}}else{if(b(d.globalVars))return;c.globalVars&&(d.globalVars={name:a,next:d.globalVars})}}function q(){Aa.state.context={prev:Aa.state.context,vars:Aa.state.localVars},Aa.state.localVars=Ba}function r(){Aa.state.localVars=Aa.state.context.vars,Aa.state.context=Aa.state.context.prev}function s(a,b){var c=function(){var c=Aa.state,d=c.indented;"stat"==c.lexical.type&&(d=c.lexical.indented),c.lexical=new k(d,Aa.stream.column(),a,null,c.lexical,b)};return c.lex=!0,c}function t(){var a=Aa.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function u(a){function b(c){return c==a?o():";"==a?n():o(b)}return b}function v(a,b){return"var"==a?o(s("vardef",b.length),R,u(";"),t):"keyword a"==a?o(s("form"),w,v,t):"keyword b"==a?o(s("form"),v,t):"{"==a?o(s("}"),O,t):";"==a?o():"if"==a?("else"==Aa.state.lexical.info&&Aa.state.cc[Aa.state.cc.length-1]==t&&Aa.state.cc.pop()(),o(s("form"),w,v,t,W)):"function"==a?o(aa):"for"==a?o(s("form"),X,v,t):"variable"==a?o(s("stat"),H):"switch"==a?o(s("form"),w,s("}","switch"),u("{"),O,t,t):"case"==a?o(w,u(":")):"default"==a?o(u(":")):"catch"==a?o(s("form"),q,u("("),ba,u(")"),v,t,r):"module"==a?o(s("form"),q,ga,r,t):"class"==a?o(s("form"),ca,t):"export"==a?o(s("form"),ha,t):"import"==a?o(s("form"),ia,t):n(s("stat"),w,u(";"),t)}function w(a){return y(a,!1)}function x(a){return y(a,!0)}function y(a,b){if(Aa.state.fatArrowAt==Aa.stream.start){var c=b?G:F;if("("==a)return o(q,s(")"),M(S,")"),t,u("=>"),c,r);if("variable"==a)return n(q,S,u("=>"),c,r)}var d=b?C:B;return za.hasOwnProperty(a)?o(d):"function"==a?o(aa,d):"keyword c"==a?o(b?A:z):"("==a?o(s(")"),z,na,u(")"),t,d):"operator"==a||"spread"==a?o(b?x:w):"["==a?o(s("]"),la,t,d):"{"==a?N(J,"}",null,d):"quasi"==a?n(D,d):o()}function z(a){return a.match(/[;\}\)\],]/)?n():n(w)}function A(a){return a.match(/[;\}\)\],]/)?n():n(x)}function B(a,b){return","==a?o(w):C(a,b,!1)}function C(a,b,c){var d=0==c?B:C,e=0==c?w:x;return"=>"==b?o(q,c?G:F,r):"operator"==a?/\+\+|--/.test(b)?o(d):"?"==b?o(w,u(":"),e):o(e):"quasi"==a?n(D,d):";"!=a?"("==a?N(x,")","call",d):"."==a?o(I,d):"["==a?o(s("]"),z,u("]"),t,d):void 0:void 0}function D(a,b){return"quasi"!=a?n():"${"!=b.slice(b.length-2)?o(D):o(w,E)}function E(a){return"}"==a?(Aa.marked="string-2",Aa.state.tokenize=i,o(D)):void 0}function F(a){return j(Aa.stream,Aa.state),n("{"==a?v:w)}function G(a){return j(Aa.stream,Aa.state),n("{"==a?v:x)}function H(a){return":"==a?o(t,v):n(B,u(";"),t)}function I(a){return"variable"==a?(Aa.marked="property",o()):void 0}function J(a,b){return"variable"==a||"keyword"==Aa.style?(Aa.marked="property",o("get"==b||"set"==b?K:L)):"number"==a||"string"==a?(Aa.marked=sa?"property":Aa.style+" property",o(L)):"jsonld-keyword"==a?o(L):"["==a?o(w,u("]"),L):void 0}function K(a){return"variable"!=a?n(L):(Aa.marked="property",o(aa))}function L(a){return":"==a?o(x):"("==a?n(aa):void 0}function M(a,b){function c(d){if(","==d){var e=Aa.state.lexical;return"call"==e.info&&(e.pos=(e.pos||0)+1),o(a,c)}return d==b?o():o(u(b))}return function(d){return d==b?o():n(a,c)}}function N(a,b,c){for(var d=3;d<arguments.length;d++)Aa.cc.push(arguments[d]);return o(s(b,c),M(a,b),t)}function O(a){return"}"==a?o():n(v,O)}function P(a){return ua&&":"==a?o(Q):void 0}function Q(a){return"variable"==a?(Aa.marked="variable-3",o()):void 0}function R(){return n(S,P,U,V)}function S(a,b){return"variable"==a?(p(b),o()):"["==a?N(S,"]"):"{"==a?N(T,"}"):void 0}function T(a,b){return"variable"!=a||Aa.stream.match(/^\s*:/,!1)?("variable"==a&&(Aa.marked="property"),o(u(":"),S,U)):(p(b),o(U))}function U(a,b){return"="==b?o(x):void 0}function V(a){return","==a?o(R):void 0}function W(a,b){return"keyword b"==a&&"else"==b?o(s("form","else"),v,t):void 0}function X(a){return"("==a?o(s(")"),Y,u(")"),t):void 0}function Y(a){return"var"==a?o(R,u(";"),$):";"==a?o($):"variable"==a?o(Z):n(w,u(";"),$)}function Z(a,b){return"in"==b||"of"==b?(Aa.marked="keyword",o(w)):o(B,$)}function $(a,b){return";"==a?o(_):"in"==b||"of"==b?(Aa.marked="keyword",o(w)):n(w,u(";"),_)}function _(a){")"!=a&&o(w)}function aa(a,b){return"*"==b?(Aa.marked="keyword",o(aa)):"variable"==a?(p(b),o(aa)):"("==a?o(q,s(")"),M(ba,")"),t,v,r):void 0}function ba(a){return"spread"==a?o(ba):n(S,P)}function ca(a,b){return"variable"==a?(p(b),o(da)):void 0}function da(a,b){return"extends"==b?o(w,da):"{"==a?o(s("}"),ea,t):void 0}function ea(a,b){return"variable"==a||"keyword"==Aa.style?(Aa.marked="property","get"==b||"set"==b?o(fa,aa,ea):o(aa,ea)):"*"==b?(Aa.marked="keyword",o(ea)):";"==a?o(ea):"}"==a?o():void 0}function fa(a){return"variable"!=a?n():(Aa.marked="property",o())}function ga(a,b){return"string"==a?o(v):"variable"==a?(p(b),o(ka)):void 0}function ha(a,b){return"*"==b?(Aa.marked="keyword",o(ka,u(";"))):"default"==b?(Aa.marked="keyword",o(w,u(";"))):n(v)}function ia(a){return"string"==a?o():n(ja,ka)}function ja(a,b){return"{"==a?N(ja,"}"):("variable"==a&&p(b),o())}function ka(a,b){return"from"==b?(Aa.marked="keyword",o(w)):void 0}function la(a){return"]"==a?o():n(x,ma)}function ma(a){return"for"==a?n(na,u("]")):","==a?o(M(x,"]")):n(M(x,"]"))}function na(a){return"for"==a?o(X,na):"if"==a?o(w,na):void 0}var oa,pa,qa=b.indentUnit,ra=c.statementIndent,sa=c.jsonld,ta=c.json||sa,ua=c.typescript,va=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),c=a("keyword b"),d=a("keyword c"),e=a("operator"),f={type:"atom",style:"atom"},g={"if":a("if"),"while":b,"with":b,"else":c,"do":c,"try":c,"finally":c,"return":d,"break":d,"continue":d,"new":d,"delete":d,"throw":d,"debugger":d,"var":a("var"),"const":a("var"),let:a("var"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),"default":a("default"),"in":e,"typeof":e,"instanceof":e,"true":f,"false":f,"null":f,undefined:f,NaN:f,Infinity:f,"this":a("this"),module:a("module"),"class":a("class"),"super":a("atom"),"yield":d,"export":a("export"),"import":a("import"),"extends":d};if(ua){var h={type:"variable",style:"variable-3"},i={"interface":a("interface"),"extends":a("extends"),constructor:a("constructor"),"public":a("public"),"private":a("private"),"protected":a("protected"),"static":a("static"),string:h,number:h,bool:h,any:h};for(var j in i)g[j]=i[j]}return g}(),wa=/[+\-*&%=<>!?|~^]/,xa=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,ya="([{}])",za={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},Aa={state:null,column:null,marked:null,cc:null},Ba={name:"this",next:{name:"arguments"}};return t.lex=!0,{startState:function(a){var b={tokenize:f,lastType:"sof",cc:[],lexical:new k((a||0)-qa,0,"block",!1),localVars:c.localVars,context:c.localVars&&{vars:c.localVars},indented:0};return c.globalVars&&"object"==typeof c.globalVars&&(b.globalVars=c.globalVars),b},token:function(a,b){if(a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation(),j(a,b)),b.tokenize!=h&&a.eatSpace())return null;var c=b.tokenize(a,b);return"comment"==oa?c:(b.lastType="operator"!=oa||"++"!=pa&&"--"!=pa?oa:"incdec",m(b,c,oa,pa,a))},indent:function(b,d){if(b.tokenize==h)return a.Pass;if(b.tokenize!=f)return 0;var e=d&&d.charAt(0),g=b.lexical;if(!/^\s*else\b/.test(d))for(var i=b.cc.length-1;i>=0;--i){var j=b.cc[i];if(j==t)g=g.prev;else if(j!=W)break}"stat"==g.type&&"}"==e&&(g=g.prev),ra&&")"==g.type&&"stat"==g.prev.type&&(g=g.prev);var k=g.type,l=e==k;return"vardef"==k?g.indented+("operator"==b.lastType||","==b.lastType?g.info+1:0):"form"==k&&"{"==e?g.indented:"form"==k?g.indented+qa:"stat"==k?g.indented+("operator"==b.lastType||","==b.lastType?ra||qa:0):"switch"!=g.info||l||0==c.doubleIndentSwitch?g.align?g.column+(l?0:1):g.indented+(l?0:qa):g.indented+(/^(?:case|default)\b/.test(d)?qa:2*qa)},electricChars:":{}",blockCommentStart:ta?null:"/*",blockCommentEnd:ta?null:"*/",lineComment:ta?null:"//",fold:"brace",helperType:ta?"json":"javascript",jsonldMode:sa,jsonMode:ta}}),a.registerHelper("wordChars","javascript",/[\\w$]/),a.defineMIME("text/javascript","javascript"),a.defineMIME("text/ecmascript","javascript"),a.defineMIME("application/javascript","javascript"),a.defineMIME("application/x-javascript","javascript"),a.defineMIME("application/ecmascript","javascript"),a.defineMIME("application/json",{name:"javascript",json:!0}),a.defineMIME("application/x-json",{name:"javascript",json:!0}),a.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),a.defineMIME("text/typescript",{name:"javascript",typescript:!0}),a.defineMIME("application/typescript",{name:"javascript",typescript:!0})});