!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){function b(b){if(b.getOption("disableInput"))return a.Pass;for(var d,e=b.listSelections(),f=[],g=0;g<e.length;g++){var h=e[g].head,i=b.getTokenAt(h);if("comment"!=i.type)return a.Pass;var j=a.innerMode(b.getMode(),i.state).mode;if(d){if(d!=j)return a.Pass}else d=j;var k=null;if(d.blockCommentStart&&d.blockCommentContinue){var l,m=i.string.indexOf(d.blockCommentEnd),n=b.getRange(a.Pos(h.line,0),a.Pos(h.line,i.end));if(-1!=m&&m==i.string.length-d.blockCommentEnd.length&&h.ch>=m);else if(0==i.string.indexOf(d.blockCommentStart)){if(k=n.slice(0,i.start),!/^\s*$/.test(k)){k="";for(var o=0;o<i.start;++o)k+=" "}}else-1!=(l=n.indexOf(d.blockCommentContinue))&&l+d.blockCommentContinue.length>i.start&&/^\s*$/.test(n.slice(0,l))&&(k=n.slice(0,l));null!=k&&(k+=d.blockCommentContinue)}if(null==k&&d.lineComment&&c(b)){var p=b.getLine(h.line),l=p.indexOf(d.lineComment);l>-1&&(k=p.slice(0,l),/\S/.test(k)?k=null:k+=d.lineComment+p.slice(l+d.lineComment.length).match(/^\s*/)[0])}if(null==k)return a.Pass;f[g]="\n"+k}b.operation(function(){for(var a=e.length-1;a>=0;a--)b.replaceRange(f[a],e[a].from(),e[a].to(),"+insert")})}function c(a){var b=a.getOption("continueComments");return b&&"object"==typeof b?b.continueLineComment!==!1:!0}for(var d=["clike","css","javascript"],e=0;e<d.length;++e)a.extendMode(d[e],{blockCommentContinue:" * "});a.defineOption("continueComments",null,function(c,d,e){if(e&&e!=a.Init&&c.removeKeyMap("continueComment"),d){var f="Enter";"string"==typeof d?f=d:"object"==typeof d&&d.key&&(f=d.key);var g={name:"continueComment"};g[f]=b,c.addKeyMap(g)}})});