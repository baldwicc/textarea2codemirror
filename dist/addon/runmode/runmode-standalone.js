window.CodeMirror={},function(){"use strict";function a(a){return a.split(/\r?\n|\r/)}function b(a){this.pos=this.start=0,this.string=a,this.lineStart=0}b.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(a){var b=this.string.charAt(this.pos);if("string"==typeof a)var c=b==a;else var c=b&&(a.test?a.test(b):a(b));return c?(++this.pos,b):void 0},eatWhile:function(a){for(var b=this.pos;this.eat(a););return this.pos>b},eatSpace:function(){for(var a=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>a},skipToEnd:function(){this.pos=this.string.length},skipTo:function(a){var b=this.string.indexOf(a,this.pos);return b>-1?(this.pos=b,!0):void 0},backUp:function(a){this.pos-=a},column:function(){return this.start-this.lineStart},indentation:function(){return 0},match:function(a,b,c){if("string"!=typeof a){var d=this.string.slice(this.pos).match(a);return d&&d.index>0?null:(d&&b!==!1&&(this.pos+=d[0].length),d)}var e=function(a){return c?a.toLowerCase():a},f=this.string.substr(this.pos,a.length);return e(f)==e(a)?(b!==!1&&(this.pos+=a.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(a,b){this.lineStart+=a;try{return b()}finally{this.lineStart-=a}}},CodeMirror.StringStream=b,CodeMirror.startState=function(a,b,c){return a.startState?a.startState(b,c):!0};var c=CodeMirror.modes={},d=CodeMirror.mimeModes={};CodeMirror.defineMode=function(a,b){c[a]=b},CodeMirror.defineMIME=function(a,b){d[a]=b},CodeMirror.resolveMode=function(a){return"string"==typeof a&&d.hasOwnProperty(a)?a=d[a]:a&&"string"==typeof a.name&&d.hasOwnProperty(a.name)&&(a=d[a.name]),"string"==typeof a?{name:a}:a||{name:"null"}},CodeMirror.getMode=function(a,b){b=CodeMirror.resolveMode(b);var d=c[b.name];if(!d)throw new Error("Unknown mode: "+b);return d(a,b)},CodeMirror.registerHelper=CodeMirror.registerGlobalHelper=Math.min,CodeMirror.defineMode("null",function(){return{token:function(a){a.skipToEnd()}}}),CodeMirror.defineMIME("text/plain","null"),CodeMirror.runMode=function(b,c,d,e){var f=CodeMirror.getMode({indentUnit:2},c);if(1==d.nodeType){var g=e&&e.tabSize||4,h=d,i=0;h.innerHTML="",d=function(a,b){if("\n"==a)return h.appendChild(document.createElement("br")),void(i=0);for(var c="",d=0;;){var e=a.indexOf("	",d);if(-1==e){c+=a.slice(d),i+=a.length-d;break}i+=e-d,c+=a.slice(d,e);var f=g-i%g;i+=f;for(var j=0;f>j;++j)c+=" ";d=e+1}if(b){var k=h.appendChild(document.createElement("span"));k.className="cm-"+b.replace(/ +/g," cm-"),k.appendChild(document.createTextNode(c))}else h.appendChild(document.createTextNode(c))}}for(var j=a(b),k=e&&e.state||CodeMirror.startState(f),l=0,m=j.length;m>l;++l){l&&d("\n");var n=new CodeMirror.StringStream(j[l]);for(!n.string&&f.blankLine&&f.blankLine(k);!n.eol();){var o=f.token(n,k);d(n.current(),o,l,n.start,k),n.start=n.pos}}}}();