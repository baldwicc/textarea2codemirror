!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function b(a,b){return a.string.charAt(a.pos+(b||0))}function c(a,b){if(b){var c=a.pos-b;return a.string.substr(c>=0?c:0,b)}return a.string.substr(0,a.pos-1)}function d(a,b){var c=a.string.length,d=c-a.pos+1;return a.string.substr(a.pos,b&&c>b?b:d)}function e(a,b){var c,d=a.pos+b;0>=d?a.pos=0:d>=(c=a.string.length-1)?a.pos=c:a.pos=d}a.defineMode("perl",function(){function a(a,b,c,d,e){return b.chain=null,b.style=null,b.tail=null,b.tokenize=function(a,b){for(var f,h=!1,i=0;f=a.next();){if(f===c[i]&&!h)return void 0!==c[++i]?(b.chain=c[i],b.style=d,b.tail=e):e&&a.eatWhile(e),b.tokenize=g,d;h=!h&&"\\"==f}return d},b.tokenize(a,b)}function f(a,b,c){return b.tokenize=function(a,b){return a.string==c&&(b.tokenize=g),a.skipToEnd(),"string"},b.tokenize(a,b)}function g(g,k){if(g.eatSpace())return null;if(k.chain)return a(g,k,k.chain,k.style,k.tail);if(g.match(/^\-?[\d\.]/,!1)&&g.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/))return"number";if(g.match(/^<<(?=\w)/))return g.eatWhile(/\w/),f(g,k,g.current().substr(2));if(g.sol()&&g.match(/^\=item(?!\w)/))return f(g,k,"=cut");var l=g.next();if('"'==l||"'"==l){if(c(g,3)=="<<"+l){var m=g.pos;g.eatWhile(/\w/);var n=g.current().substr(1);if(n&&g.eat(l))return f(g,k,n);g.pos=m}return a(g,k,[l],"string")}if("q"==l){var o=b(g,-2);if(!o||!/\w/.test(o))if(o=b(g,0),"x"==o){if(o=b(g,1),"("==o)return e(g,2),a(g,k,[")"],i,j);if("["==o)return e(g,2),a(g,k,["]"],i,j);if("{"==o)return e(g,2),a(g,k,["}"],i,j);if("<"==o)return e(g,2),a(g,k,[">"],i,j);if(/[\^'"!~\/]/.test(o))return e(g,1),a(g,k,[g.eat(o)],i,j)}else if("q"==o){if(o=b(g,1),"("==o)return e(g,2),a(g,k,[")"],"string");if("["==o)return e(g,2),a(g,k,["]"],"string");if("{"==o)return e(g,2),a(g,k,["}"],"string");if("<"==o)return e(g,2),a(g,k,[">"],"string");if(/[\^'"!~\/]/.test(o))return e(g,1),a(g,k,[g.eat(o)],"string")}else if("w"==o){if(o=b(g,1),"("==o)return e(g,2),a(g,k,[")"],"bracket");if("["==o)return e(g,2),a(g,k,["]"],"bracket");if("{"==o)return e(g,2),a(g,k,["}"],"bracket");if("<"==o)return e(g,2),a(g,k,[">"],"bracket");if(/[\^'"!~\/]/.test(o))return e(g,1),a(g,k,[g.eat(o)],"bracket")}else if("r"==o){if(o=b(g,1),"("==o)return e(g,2),a(g,k,[")"],i,j);if("["==o)return e(g,2),a(g,k,["]"],i,j);if("{"==o)return e(g,2),a(g,k,["}"],i,j);if("<"==o)return e(g,2),a(g,k,[">"],i,j);if(/[\^'"!~\/]/.test(o))return e(g,1),a(g,k,[g.eat(o)],i,j)}else if(/[\^'"!~\/(\[{<]/.test(o)){if("("==o)return e(g,1),a(g,k,[")"],"string");if("["==o)return e(g,1),a(g,k,["]"],"string");if("{"==o)return e(g,1),a(g,k,["}"],"string");if("<"==o)return e(g,1),a(g,k,[">"],"string");if(/[\^'"!~\/]/.test(o))return a(g,k,[g.eat(o)],"string")}}if("m"==l){var o=b(g,-2);if((!o||!/\w/.test(o))&&(o=g.eat(/[(\[{<\^'"!~\/]/))){if(/[\^'"!~\/]/.test(o))return a(g,k,[o],i,j);if("("==o)return a(g,k,[")"],i,j);if("["==o)return a(g,k,["]"],i,j);if("{"==o)return a(g,k,["}"],i,j);if("<"==o)return a(g,k,[">"],i,j)}}if("s"==l){var o=/[\/>\]})\w]/.test(b(g,-2));if(!o&&(o=g.eat(/[(\[{<\^'"!~\/]/)))return"["==o?a(g,k,["]","]"],i,j):"{"==o?a(g,k,["}","}"],i,j):"<"==o?a(g,k,[">",">"],i,j):"("==o?a(g,k,[")",")"],i,j):a(g,k,[o,o],i,j)}if("y"==l){var o=/[\/>\]})\w]/.test(b(g,-2));if(!o&&(o=g.eat(/[(\[{<\^'"!~\/]/)))return"["==o?a(g,k,["]","]"],i,j):"{"==o?a(g,k,["}","}"],i,j):"<"==o?a(g,k,[">",">"],i,j):"("==o?a(g,k,[")",")"],i,j):a(g,k,[o,o],i,j)}if("t"==l){var o=/[\/>\]})\w]/.test(b(g,-2));if(!o&&(o=g.eat("r"),o&&(o=g.eat(/[(\[{<\^'"!~\/]/))))return"["==o?a(g,k,["]","]"],i,j):"{"==o?a(g,k,["}","}"],i,j):"<"==o?a(g,k,[">",">"],i,j):"("==o?a(g,k,[")",")"],i,j):a(g,k,[o,o],i,j)}if("`"==l)return a(g,k,[l],"variable-2");if("/"==l)return/~\s*$/.test(c(g))?a(g,k,[l],i,j):"operator";if("$"==l){var m=g.pos;if(g.eatWhile(/\d/)||g.eat("{")&&g.eatWhile(/\d/)&&g.eat("}"))return"variable-2";g.pos=m}if(/[$@%]/.test(l)){var m=g.pos;if(g.eat("^")&&g.eat(/[A-Z]/)||!/[@$%&]/.test(b(g,-2))&&g.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)){var o=g.current();if(h[o])return"variable-2"}g.pos=m}if(/[$@%&]/.test(l)&&(g.eatWhile(/[\w$\[\]]/)||g.eat("{")&&g.eatWhile(/[\w$\[\]]/)&&g.eat("}"))){var o=g.current();return h[o]?"variable-2":"variable"}if("#"==l&&"$"!=b(g,-2))return g.skipToEnd(),"comment";if(/[:+\-\^*$&%@=<>!?|\/~\.]/.test(l)){var m=g.pos;if(g.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/),h[g.current()])return"operator";g.pos=m}if("_"==l&&1==g.pos){if("_END__"==d(g,6))return a(g,k,["\x00"],"comment");if("_DATA__"==d(g,7))return a(g,k,["\x00"],"variable-2");if("_C__"==d(g,7))return a(g,k,["\x00"],"string")}if(/\w/.test(l)){var m=g.pos;if("{"==b(g,-2)&&("}"==b(g,0)||g.eatWhile(/\w/)&&"}"==b(g,0)))return"string";g.pos=m}if(/[A-Z]/.test(l)){var p=b(g,-2),m=g.pos;if(g.eatWhile(/[A-Z_]/),!/[\da-z]/.test(b(g,0))){var o=h[g.current()];return o?(o[1]&&(o=o[0]),":"!=p?1==o?"keyword":2==o?"def":3==o?"atom":4==o?"operator":5==o?"variable-2":"meta":"meta"):"meta"}g.pos=m}if(/[a-zA-Z_]/.test(l)){var p=b(g,-2);g.eatWhile(/\w/);var o=h[g.current()];return o?(o[1]&&(o=o[0]),":"!=p?1==o?"keyword":2==o?"def":3==o?"atom":4==o?"operator":5==o?"variable-2":"meta":"meta"):"meta"}return null}var h={"->":4,"++":4,"--":4,"**":4,"=~":4,"!~":4,"*":4,"/":4,"%":4,x:4,"+":4,"-":4,".":4,"<<":4,">>":4,"<":4,">":4,"<=":4,">=":4,lt:4,gt:4,le:4,ge:4,"==":4,"!=":4,"<=>":4,eq:4,ne:4,cmp:4,"~~":4,"&":4,"|":4,"^":4,"&&":4,"||":4,"//":4,"..":4,"...":4,"?":4,":":4,"=":4,"+=":4,"-=":4,"*=":4,",":4,"=>":4,"::":4,not:4,and:4,or:4,xor:4,BEGIN:[5,1],END:[5,1],PRINT:[5,1],PRINTF:[5,1],GETC:[5,1],READ:[5,1],READLINE:[5,1],DESTROY:[5,1],TIE:[5,1],TIEHANDLE:[5,1],UNTIE:[5,1],STDIN:5,STDIN_TOP:5,STDOUT:5,STDOUT_TOP:5,STDERR:5,STDERR_TOP:5,$ARG:5,$_:5,"@ARG":5,"@_":5,$LIST_SEPARATOR:5,'$"':5,$PROCESS_ID:5,$PID:5,$$:5,$REAL_GROUP_ID:5,$GID:5,"$(":5,$EFFECTIVE_GROUP_ID:5,$EGID:5,"$)":5,$PROGRAM_NAME:5,$0:5,$SUBSCRIPT_SEPARATOR:5,$SUBSEP:5,"$;":5,$REAL_USER_ID:5,$UID:5,"$<":5,$EFFECTIVE_USER_ID:5,$EUID:5,"$>":5,$a:5,$b:5,$COMPILING:5,"$^C":5,$DEBUGGING:5,"$^D":5,"${^ENCODING}":5,$ENV:5,"%ENV":5,$SYSTEM_FD_MAX:5,"$^F":5,"@F":5,"${^GLOBAL_PHASE}":5,"$^H":5,"%^H":5,"@INC":5,"%INC":5,$INPLACE_EDIT:5,"$^I":5,"$^M":5,$OSNAME:5,"$^O":5,"${^OPEN}":5,$PERLDB:5,"$^P":5,$SIG:5,"%SIG":5,$BASETIME:5,"$^T":5,"${^TAINT}":5,"${^UNICODE}":5,"${^UTF8CACHE}":5,"${^UTF8LOCALE}":5,$PERL_VERSION:5,"$^V":5,"${^WIN32_SLOPPY_STAT}":5,$EXECUTABLE_NAME:5,"$^X":5,$1:5,$MATCH:5,"$&":5,"${^MATCH}":5,$PREMATCH:5,"$`":5,"${^PREMATCH}":5,$POSTMATCH:5,"$'":5,"${^POSTMATCH}":5,$LAST_PAREN_MATCH:5,"$+":5,$LAST_SUBMATCH_RESULT:5,"$^N":5,"@LAST_MATCH_END":5,"@+":5,"%LAST_PAREN_MATCH":5,"%+":5,"@LAST_MATCH_START":5,"@-":5,"%LAST_MATCH_START":5,"%-":5,$LAST_REGEXP_CODE_RESULT:5,"$^R":5,"${^RE_DEBUG_FLAGS}":5,"${^RE_TRIE_MAXBUF}":5,$ARGV:5,"@ARGV":5,ARGV:5,ARGVOUT:5,$OUTPUT_FIELD_SEPARATOR:5,$OFS:5,"$,":5,$INPUT_LINE_NUMBER:5,$NR:5,"$.":5,$INPUT_RECORD_SEPARATOR:5,$RS:5,"$/":5,$OUTPUT_RECORD_SEPARATOR:5,$ORS:5,"$\\":5,$OUTPUT_AUTOFLUSH:5,"$|":5,$ACCUMULATOR:5,"$^A":5,$FORMAT_FORMFEED:5,"$^L":5,$FORMAT_PAGE_NUMBER:5,"$%":5,$FORMAT_LINES_LEFT:5,"$-":5,$FORMAT_LINE_BREAK_CHARACTERS:5,"$:":5,$FORMAT_LINES_PER_PAGE:5,"$=":5,$FORMAT_TOP_NAME:5,"$^":5,$FORMAT_NAME:5,"$~":5,"${^CHILD_ERROR_NATIVE}":5,$EXTENDED_OS_ERROR:5,"$^E":5,$EXCEPTIONS_BEING_CAUGHT:5,"$^S":5,$WARNING:5,"$^W":5,"${^WARNING_BITS}":5,$OS_ERROR:5,$ERRNO:5,"$!":5,"%OS_ERROR":5,"%ERRNO":5,"%!":5,$CHILD_ERROR:5,"$?":5,$EVAL_ERROR:5,"$@":5,$OFMT:5,"$#":5,"$*":5,$ARRAY_BASE:5,"$[":5,$OLD_PERL_VERSION:5,"$]":5,"if":[1,1],elsif:[1,1],"else":[1,1],"while":[1,1],unless:[1,1],"for":[1,1],foreach:[1,1],abs:1,accept:1,alarm:1,atan2:1,bind:1,binmode:1,bless:1,bootstrap:1,"break":1,caller:1,chdir:1,chmod:1,chomp:1,chop:1,chown:1,chr:1,chroot:1,close:1,closedir:1,connect:1,"continue":[1,1],cos:1,crypt:1,dbmclose:1,dbmopen:1,"default":1,defined:1,"delete":1,die:1,"do":1,dump:1,each:1,endgrent:1,endhostent:1,endnetent:1,endprotoent:1,endpwent:1,endservent:1,eof:1,eval:1,exec:1,exists:1,exit:1,exp:1,fcntl:1,fileno:1,flock:1,fork:1,format:1,formline:1,getc:1,getgrent:1,getgrgid:1,getgrnam:1,gethostbyaddr:1,gethostbyname:1,gethostent:1,getlogin:1,getnetbyaddr:1,getnetbyname:1,getnetent:1,getpeername:1,getpgrp:1,getppid:1,getpriority:1,getprotobyname:1,getprotobynumber:1,getprotoent:1,getpwent:1,getpwnam:1,getpwuid:1,getservbyname:1,getservbyport:1,getservent:1,getsockname:1,getsockopt:1,given:1,glob:1,gmtime:1,"goto":1,grep:1,hex:1,"import":1,index:1,"int":1,ioctl:1,join:1,keys:1,kill:1,last:1,lc:1,lcfirst:1,length:1,link:1,listen:1,local:2,localtime:1,lock:1,log:1,lstat:1,m:null,map:1,mkdir:1,msgctl:1,msgget:1,msgrcv:1,msgsnd:1,my:2,"new":1,next:1,no:1,oct:1,open:1,opendir:1,ord:1,our:2,pack:1,"package":1,pipe:1,pop:1,pos:1,print:1,printf:1,prototype:1,push:1,q:null,qq:null,qr:null,quotemeta:null,qw:null,qx:null,rand:1,read:1,readdir:1,readline:1,readlink:1,readpipe:1,recv:1,redo:1,ref:1,rename:1,require:1,reset:1,"return":1,reverse:1,rewinddir:1,rindex:1,rmdir:1,s:null,say:1,scalar:1,seek:1,seekdir:1,select:1,semctl:1,semget:1,semop:1,send:1,setgrent:1,sethostent:1,setnetent:1,setpgrp:1,setpriority:1,setprotoent:1,setpwent:1,setservent:1,setsockopt:1,shift:1,shmctl:1,shmget:1,shmread:1,shmwrite:1,shutdown:1,sin:1,sleep:1,socket:1,socketpair:1,sort:1,splice:1,split:1,sprintf:1,sqrt:1,srand:1,stat:1,state:1,study:1,sub:1,substr:1,symlink:1,syscall:1,sysopen:1,sysread:1,sysseek:1,system:1,syswrite:1,tell:1,telldir:1,tie:1,tied:1,time:1,times:1,tr:null,truncate:1,uc:1,ucfirst:1,umask:1,undef:1,unlink:1,unpack:1,unshift:1,untie:1,use:1,utime:1,values:1,vec:1,wait:1,waitpid:1,wantarray:1,warn:1,when:1,write:1,y:null},i="string-2",j=/[goseximacplud]/;return{startState:function(){return{tokenize:g,chain:null,style:null,tail:null}},token:function(a,b){return(b.tokenize||g)(a,b)},electricChars:"{}"}}),a.registerHelper("wordChars","perl",/[\\w$]/),a.defineMIME("text/x-perl","perl")});