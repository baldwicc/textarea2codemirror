!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function b(a,b,e,f){if(this.atOccurrence=!1,this.doc=a,null==f&&"string"==typeof b&&(f=!1),e=e?a.clipPos(e):d(0,0),this.pos={from:e,to:e},"string"!=typeof b)b.global||(b=new RegExp(b.source,b.ignoreCase?"ig":"g")),this.matches=function(c,e){if(c){b.lastIndex=0;for(var f,g,h=a.getLine(e.line).slice(0,e.ch),i=0;;){b.lastIndex=i;var j=b.exec(h);if(!j)break;if(f=j,g=f.index,i=f.index+(f[0].length||1),i==h.length)break}var k=f&&f[0].length||0;k||(0==g&&0==h.length?f=void 0:g!=a.getLine(e.line).length&&k++)}else{b.lastIndex=e.ch;var h=a.getLine(e.line),f=b.exec(h),k=f&&f[0].length||0,g=f&&f.index;g+k==h.length||k||(k=1)}return f&&k?{from:d(e.line,g),to:d(e.line,g+k),match:f}:void 0};else{var g=b;f&&(b=b.toLowerCase());var h=f?function(a){return a.toLowerCase()}:function(a){return a},i=b.split("\n");if(1==i.length)b.length?this.matches=function(e,f){if(e){var i=a.getLine(f.line).slice(0,f.ch),j=h(i),k=j.lastIndexOf(b);if(k>-1)return k=c(i,j,k),{from:d(f.line,k),to:d(f.line,k+g.length)}}else{var i=a.getLine(f.line).slice(f.ch),j=h(i),k=j.indexOf(b);if(k>-1)return k=c(i,j,k)+f.ch,{from:d(f.line,k),to:d(f.line,k+g.length)}}}:this.matches=function(){};else{var j=g.split("\n");this.matches=function(b,c){var e=i.length-1;if(b){if(c.line-(i.length-1)<a.firstLine())return;if(h(a.getLine(c.line).slice(0,j[e].length))!=i[i.length-1])return;for(var f=d(c.line,j[e].length),g=c.line-1,k=e-1;k>=1;--k,--g)if(i[k]!=h(a.getLine(g)))return;var l=a.getLine(g),m=l.length-j[0].length;if(h(l.slice(m))!=i[0])return;return{from:d(g,m),to:f}}if(!(c.line+(i.length-1)>a.lastLine())){var l=a.getLine(c.line),m=l.length-j[0].length;if(h(l.slice(m))==i[0]){for(var n=d(c.line,m),g=c.line+1,k=1;e>k;++k,++g)if(i[k]!=h(a.getLine(g)))return;if(a.getLine(g).slice(0,j[e].length)==i[e])return{from:n,to:d(g,j[e].length)}}}}}}}function c(a,b,c){if(a.length==b.length)return c;for(var d=Math.min(c,a.length);;){var e=a.slice(0,d).toLowerCase().length;if(c>e)++d;else{if(!(e>c))return d;--d}}}var d=a.Pos;b.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(a){function b(a){var b=d(a,0);return c.pos={from:b,to:b},c.atOccurrence=!1,!1}for(var c=this,e=this.doc.clipPos(a?this.pos.from:this.pos.to);;){if(this.pos=this.matches(a,e))return this.atOccurrence=!0,this.pos.match||!0;if(a){if(!e.line)return b(0);e=d(e.line-1,this.doc.getLine(e.line-1).length)}else{var f=this.doc.lineCount();if(e.line==f-1)return b(f);e=d(e.line+1,0)}}},from:function(){return this.atOccurrence?this.pos.from:void 0},to:function(){return this.atOccurrence?this.pos.to:void 0},replace:function(b){if(this.atOccurrence){var c=a.splitLines(b);this.doc.replaceRange(c,this.pos.from,this.pos.to),this.pos.to=d(this.pos.from.line+c.length-1,c[c.length-1].length+(1==c.length?this.pos.from.ch:0))}}},a.defineExtension("getSearchCursor",function(a,c,d){return new b(this.doc,a,c,d)}),a.defineDocExtension("getSearchCursor",function(a,c,d){return new b(this,a,c,d)}),a.defineExtension("selectMatches",function(b,c){for(var d,e=[],f=this.getSearchCursor(b,this.getCursor("from"),c);(d=f.findNext())&&!(a.cmpPos(f.to(),this.getCursor("to"))>0);)e.push({anchor:f.from(),head:f.to()});e.length&&this.setSelections(e,0)})});