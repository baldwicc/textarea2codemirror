!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";a.defineMode("pascal",function(){function a(a){for(var b={},c=a.split(" "),d=0;d<c.length;++d)b[c[d]]=!0;return b}function b(a,b){var h=a.next();if("#"==h&&b.startOfLine)return a.skipToEnd(),"meta";if('"'==h||"'"==h)return b.tokenize=c(h),b.tokenize(a,b);if("("==h&&a.eat("*"))return b.tokenize=d,d(a,b);if(/[\[\]{}\(\),;\:\.]/.test(h))return null;if(/\d/.test(h))return a.eatWhile(/[\w\.]/),"number";if("/"==h&&a.eat("/"))return a.skipToEnd(),"comment";if(g.test(h))return a.eatWhile(g),"operator";a.eatWhile(/[\w\$_]/);var i=a.current();return e.propertyIsEnumerable(i)?"keyword":f.propertyIsEnumerable(i)?"atom":"variable"}function c(a){return function(b,c){for(var d,e=!1,f=!1;null!=(d=b.next());){if(d==a&&!e){f=!0;break}e=!e&&"\\"==d}return(f||!e)&&(c.tokenize=null),"string"}}function d(a,b){for(var c,d=!1;c=a.next();){if(")"==c&&d){b.tokenize=null;break}d="*"==c}return"comment"}var e=a("and array begin case const div do downto else end file for forward integer boolean char function goto if in label mod nil not of or packed procedure program record repeat set string then to type until var while with"),f={"null":!0},g=/[+\-*&%=<>!?|\/]/;return{startState:function(){return{tokenize:null}},token:function(a,c){if(a.eatSpace())return null;var d=(c.tokenize||b)(a,c);return"comment"==d||"meta"==d?d:d},electricChars:"{}"}}),a.defineMIME("text/x-pascal","pascal")});