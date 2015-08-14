!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";a.defineMode("xquery",function(){function a(a,b,c){return t=a,u=c,b}function b(a,b,c){return b.tokenize=c,c(a,b)}function c(c,h){var m=c.next(),o=!1,q=p(c);if("<"==m){if(c.match("!--",!0))return b(c,h,i);if(c.match("![CDATA",!1))return h.tokenize=j,a("tag","tag");if(c.match("?",!1))return b(c,h,k);var t=c.eat("/");c.eatSpace();for(var u,w="";u=c.eat(/[^\s\u00a0=<>\"\'\/?]/);)w+=u;return b(c,h,g(w,t))}if("{"==m)return r(h,{type:"codeblock"}),a("",null);if("}"==m)return s(h),a("",null);if(l(h))return">"==m?a("tag","tag"):"/"==m&&c.eat(">")?(s(h),a("tag","tag")):a("word","variable");if(/\d/.test(m))return c.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/),a("number","atom");if("("===m&&c.eat(":"))return r(h,{type:"comment"}),b(c,h,d);if(q||'"'!==m&&"'"!==m){if("$"===m)return b(c,h,f);if(":"===m&&c.eat("="))return a("operator","keyword");if("("===m)return r(h,{type:"paren"}),a("",null);if(")"===m)return s(h),a("",null);if("["===m)return r(h,{type:"bracket"}),a("",null);if("]"===m)return s(h),a("",null);var x=v.propertyIsEnumerable(m)&&v[m];if(q&&'"'===m)for(;'"'!==c.next(););if(q&&"'"===m)for(;"'"!==c.next(););x||c.eatWhile(/[\w\$_-]/);var y=c.eat(":");!c.eat(":")&&y&&c.eatWhile(/[\w\$_-]/),c.match(/^[ \t]*\(/,!1)&&(o=!0);var z=c.current();return x=v.propertyIsEnumerable(z)&&v[z],o&&!x&&(x={type:"function_call",style:"variable def"}),n(h)?(s(h),a("word","variable",z)):(("element"==z||"attribute"==z||"axis_specifier"==x.type)&&r(h,{type:"xmlconstructor"}),x?a(x.type,x.style,z):a("word","variable",z))}return b(c,h,e(m))}function d(b,c){for(var d,e=!1,f=!1,g=0;d=b.next();){if(")"==d&&e){if(!(g>0)){s(c);break}g--}else":"==d&&f&&g++;e=":"==d,f="("==d}return a("comment","comment")}function e(b,d){return function(f,g){var h;if(o(g)&&f.current()==b)return s(g),d&&(g.tokenize=d),a("string","string");if(r(g,{type:"string",name:b,tokenize:e(b,d)}),f.match("{",!1)&&m(g))return g.tokenize=c,a("string","string");for(;h=f.next();){if(h==b){s(g),d&&(g.tokenize=d);break}if(f.match("{",!1)&&m(g))return g.tokenize=c,a("string","string")}return a("string","string")}}function f(b,d){var e=/[\w\$_-]/;if(b.eat('"')){for(;'"'!==b.next(););b.eat(":")}else b.eatWhile(e),b.match(":=",!1)||b.eat(":");return b.eatWhile(e),d.tokenize=c,a("variable","variable")}function g(b,d){return function(e,f){return e.eatSpace(),d&&e.eat(">")?(s(f),f.tokenize=c,a("tag","tag")):(e.eat("/")||r(f,{type:"tag",name:b,tokenize:c}),e.eat(">")?(f.tokenize=c,a("tag","tag")):(f.tokenize=h,a("tag","tag")))}}function h(d,f){var g=d.next();return"/"==g&&d.eat(">")?(m(f)&&s(f),l(f)&&s(f),a("tag","tag")):">"==g?(m(f)&&s(f),a("tag","tag")):"="==g?a("",null):'"'==g||"'"==g?b(d,f,e(g,h)):(m(f)||r(f,{type:"attribute",tokenize:h}),d.eat(/[a-zA-Z_:]/),d.eatWhile(/[-a-zA-Z0-9_:.]/),d.eatSpace(),(d.match(">",!1)||d.match("/",!1))&&(s(f),f.tokenize=c),a("attribute","attribute"))}function i(b,d){for(var e;e=b.next();)if("-"==e&&b.match("->",!0))return d.tokenize=c,a("comment","comment")}function j(b,d){for(var e;e=b.next();)if("]"==e&&b.match("]",!0))return d.tokenize=c,a("comment","comment")}function k(b,d){for(var e;e=b.next();)if("?"==e&&b.match(">",!0))return d.tokenize=c,a("comment","comment meta")}function l(a){return q(a,"tag")}function m(a){return q(a,"attribute")}function n(a){return q(a,"xmlconstructor")}function o(a){return q(a,"string")}function p(a){return'"'===a.current()?a.match(/^[^\"]+\"\:/,!1):"'"===a.current()?a.match(/^[^\"]+\'\:/,!1):!1}function q(a,b){return a.stack.length&&a.stack[a.stack.length-1].type==b}function r(a,b){a.stack.push(b)}function s(a){a.stack.pop();var b=a.stack.length&&a.stack[a.stack.length-1].tokenize;a.tokenize=b||c}var t,u,v=function(){function a(a){return{type:a,style:"keyword"}}for(var b=a("keyword a"),c=a("keyword b"),d=a("keyword c"),e=a("operator"),f={type:"atom",style:"atom"},g={type:"punctuation",style:null},h={type:"axis_specifier",style:"qualifier"},i={"if":b,"switch":b,"while":b,"for":b,"else":c,then:c,"try":c,"finally":c,"catch":c,element:d,attribute:d,let:d,"implements":d,"import":d,module:d,namespace:d,"return":d,"super":d,"this":d,"throws":d,where:d,"private":d,",":g,"null":f,"fn:false()":f,"fn:true()":f},j=["after","ancestor","ancestor-or-self","and","as","ascending","assert","attribute","before","by","case","cast","child","comment","declare","default","define","descendant","descendant-or-self","descending","document","document-node","element","else","eq","every","except","external","following","following-sibling","follows","for","function","if","import","in","instance","intersect","item","let","module","namespace","node","node","of","only","or","order","parent","precedes","preceding","preceding-sibling","processing-instruction","ref","return","returns","satisfies","schema","schema-element","self","some","sortby","stable","text","then","to","treat","typeswitch","union","variable","version","where","xquery","empty-sequence"],k=0,l=j.length;l>k;k++)i[j[k]]=a(j[k]);for(var m=["xs:string","xs:float","xs:decimal","xs:double","xs:integer","xs:boolean","xs:date","xs:dateTime","xs:time","xs:duration","xs:dayTimeDuration","xs:time","xs:yearMonthDuration","numeric","xs:hexBinary","xs:base64Binary","xs:anyURI","xs:QName","xs:byte","xs:boolean","xs:anyURI","xf:yearMonthDuration"],k=0,l=m.length;l>k;k++)i[m[k]]=f;for(var n=["eq","ne","lt","le","gt","ge",":=","=",">",">=","<","<=",".","|","?","and","or","div","idiv","mod","*","/","+","-"],k=0,l=n.length;l>k;k++)i[n[k]]=e;for(var o=["self::","attribute::","child::","descendant::","descendant-or-self::","parent::","ancestor::","ancestor-or-self::","following::","preceding::","following-sibling::","preceding-sibling::"],k=0,l=o.length;l>k;k++)i[o[k]]=h;return i}();return{startState:function(){return{tokenize:c,cc:[],stack:[]}},token:function(a,b){if(a.eatSpace())return null;var c=b.tokenize(a,b);return c},blockCommentStart:"(:",blockCommentEnd:":)"}}),a.defineMIME("application/xquery","xquery")});