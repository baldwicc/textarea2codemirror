!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";function b(a){for(var b={},c=0;c<a.length;++c)b[a[c]]=!0;return b}function c(a,b){for(var c,d=!1;null!=(c=a.next());){if(d&&"/"==c){b.tokenize=null;break}d="*"==c}return["comment","comment"]}function d(a,b){return a.skipTo("-->")?(a.match("-->"),b.tokenize=null):a.skipToEnd(),["comment","comment"]}a.defineMode("css",function(b,c){function d(a,b){return n=b,a}function e(a,b){var c=a.next();if(q[c]){var e=q[c](a,b);if(e!==!1)return e}return"@"==c?(a.eatWhile(/[\w\\\-]/),d("def",a.current())):"="==c||("~"==c||"|"==c)&&a.eat("=")?d(null,"compare"):'"'==c||"'"==c?(b.tokenize=f(c),b.tokenize(a,b)):"#"==c?(a.eatWhile(/[\w\\\-]/),d("atom","hash")):"!"==c?(a.match(/^\s*\w*/),d("keyword","important")):/\d/.test(c)||"."==c&&a.eat(/\d/)?(a.eatWhile(/[\w.%]/),d("number","unit")):"-"!==c?/[,+>*\/]/.test(c)?d(null,"select-op"):"."==c&&a.match(/^-?[_a-z][_a-z0-9-]*/i)?d("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(c)?d(null,c):"u"==c&&a.match("rl(")?(a.backUp(1),b.tokenize=g,d("property","word")):/[\w\\\-]/.test(c)?(a.eatWhile(/[\w\\\-]/),d("property","word")):d(null,null):/[\d.]/.test(a.peek())?(a.eatWhile(/[\w.%]/),d("number","unit")):a.match(/^\w+-/)?d("meta","meta"):void 0}function f(a){return function(b,c){for(var e,f=!1;null!=(e=b.next());){if(e==a&&!f){")"==a&&b.backUp(1);break}f=!f&&"\\"==e}return(e==a||!f&&")"!=a)&&(c.tokenize=null),d("string","string")}}function g(a,b){return a.next(),a.match(/\s*[\"\')]/,!1)?b.tokenize=null:b.tokenize=f(")"),d(null,"(")}function h(a,b,c){this.type=a,this.indent=b,this.prev=c}function i(a,b,c){return a.context=new h(c,b.indentation()+p,a.context),c}function j(a){return a.context=a.context.prev,a.context.type}function k(a,b,c){return z[c.context.type](a,b,c)}function l(a,b,c,d){for(var e=d||1;e>0;e--)c.context=c.context.prev;return k(a,b,c)}function m(a){var b=a.current().toLowerCase();o=w.hasOwnProperty(b)?"atom":v.hasOwnProperty(b)?"keyword":"variable"}c.propertyKeywords||(c=a.resolveMode("text/css"));var n,o,p=b.indentUnit,q=c.tokenHooks,r=c.mediaTypes||{},s=c.mediaFeatures||{},t=c.propertyKeywords||{},u=c.nonStandardPropertyKeywords||{},v=c.colorKeywords||{},w=c.valueKeywords||{},x=c.fontProperties||{},y=c.allowNested,z={};return z.top=function(a,b,c){if("{"==a)return i(c,b,"block");if("}"==a&&c.context.prev)return j(c);if("@media"==a)return i(c,b,"media");if("@font-face"==a)return"font_face_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(a))return"keyframes";if(a&&"@"==a.charAt(0))return i(c,b,"at");if("hash"==a)o="builtin";else if("word"==a)o="tag";else{if("variable-definition"==a)return"maybeprop";if("interpolation"==a)return i(c,b,"interpolation");if(":"==a)return"pseudo";if(y&&"("==a)return i(c,b,"parens")}return c.context.type},z.block=function(a,b,c){if("word"==a){var d=b.current().toLowerCase();return t.hasOwnProperty(d)?(o="property","maybeprop"):u.hasOwnProperty(d)?(o="string-2","maybeprop"):y?(o=b.match(/^\s*:/,!1)?"property":"tag","block"):(o+=" error","maybeprop")}return"meta"==a?"block":y||"hash"!=a&&"qualifier"!=a?z.top(a,b,c):(o="error","block")},z.maybeprop=function(a,b,c){return":"==a?i(c,b,"prop"):k(a,b,c)},z.prop=function(a,b,c){if(";"==a)return j(c);if("{"==a&&y)return i(c,b,"propBlock");if("}"==a||"{"==a)return l(a,b,c);if("("==a)return i(c,b,"parens");if("hash"!=a||/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(b.current())){if("word"==a)m(b);else if("interpolation"==a)return i(c,b,"interpolation")}else o+=" error";return"prop"},z.propBlock=function(a,b,c){return"}"==a?j(c):"word"==a?(o="property","maybeprop"):c.context.type},z.parens=function(a,b,c){return"{"==a||"}"==a?l(a,b,c):")"==a?j(c):"("==a?i(c,b,"parens"):("word"==a&&m(b),"parens")},z.pseudo=function(a,b,c){return"word"==a?(o="variable-3",c.context.type):k(a,b,c)},z.media=function(a,b,c){if("("==a)return i(c,b,"media_parens");if("}"==a)return l(a,b,c);if("{"==a)return j(c)&&i(c,b,y?"block":"top");if("word"==a){var d=b.current().toLowerCase();o="only"==d||"not"==d||"and"==d?"keyword":r.hasOwnProperty(d)?"attribute":s.hasOwnProperty(d)?"property":"error"}return c.context.type},z.media_parens=function(a,b,c){return")"==a?j(c):"{"==a||"}"==a?l(a,b,c,2):z.media(a,b,c)},z.font_face_before=function(a,b,c){return"{"==a?i(c,b,"font_face"):k(a,b,c)},z.font_face=function(a,b,c){return"}"==a?j(c):"word"==a?(o=x.hasOwnProperty(b.current().toLowerCase())?"property":"error","maybeprop"):"font_face"},z.keyframes=function(a,b,c){return"word"==a?(o="variable","keyframes"):"{"==a?i(c,b,"top"):k(a,b,c)},z.at=function(a,b,c){return";"==a?j(c):"{"==a||"}"==a?l(a,b,c):("word"==a?o="tag":"hash"==a&&(o="builtin"),"at")},z.interpolation=function(a,b,c){return"}"==a?j(c):"{"==a||";"==a?l(a,b,c):("variable"!=a&&(o="error"),"interpolation")},{startState:function(a){return{tokenize:null,state:"top",context:new h("top",a||0,null)}},token:function(a,b){if(!b.tokenize&&a.eatSpace())return null;var c=(b.tokenize||e)(a,b);return c&&"object"==typeof c&&(n=c[1],c=c[0]),o=c,b.state=z[b.state](n,a,b),o},indent:function(a,b){var c=a.context,d=b&&b.charAt(0),e=c.indent;return"prop"!=c.type||"}"!=d&&")"!=d||(c=c.prev),!c.prev||("}"!=d||"block"!=c.type&&"top"!=c.type&&"interpolation"!=c.type&&"font_face"!=c.type)&&(")"!=d||"parens"!=c.type&&"media_parens"!=c.type)&&("{"!=d||"at"!=c.type&&"media"!=c.type)||(e=c.indent-p,c=c.prev),e},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace"}});var e=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],f=b(e),g=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid"],h=b(g),i=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-position","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],j=b(i),k=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],k=b(k),l=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],m=b(l),n=["above","absolute","activeborder","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","column","compact","condensed","contain","content","content-box","context-menu","continuous","copy","cover","crop","cross","crosshair","currentcolor","cursive","dashed","decimal","decimal-leading-zero","default","default-button","destination-atop","destination-in","destination-out","destination-over","devanagari","disc","discard","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ew-resize","expanded","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","footnotes","forwards","from","geometricPrecision","georgian","graytext","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-table","inset","inside","intrinsic","invert","italic","justify","kannada","katakana","katakana-iroha","keep-all","khmer","landscape","lao","large","larger","left","level","lighter","line-through","linear","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","malayalam","match","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","round","row-resize","rtl","run-in","running","s-resize","sans-serif","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","single","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","solid","somali","source-atop","source-in","source-out","source-over","space","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","x-large","x-small","xor","xx-large","xx-small"],o=b(n),p=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"],q=b(p),r=e.concat(g).concat(i).concat(k).concat(l).concat(n);a.registerHelper("hintWords","css",r),a.defineMIME("text/css",{mediaTypes:f,mediaFeatures:h,propertyKeywords:j,nonStandardPropertyKeywords:k,colorKeywords:m,valueKeywords:o,fontProperties:q,tokenHooks:{"<":function(a,b){return a.match("!--")?(b.tokenize=d,d(a,b)):!1},"/":function(a,b){return a.eat("*")?(b.tokenize=c,c(a,b)):!1}},name:"css"}),a.defineMIME("text/x-scss",{mediaTypes:f,mediaFeatures:h,propertyKeywords:j,nonStandardPropertyKeywords:k,colorKeywords:m,valueKeywords:o,fontProperties:q,allowNested:!0,tokenHooks:{"/":function(a,b){return a.eat("/")?(a.skipToEnd(),["comment","comment"]):a.eat("*")?(b.tokenize=c,c(a,b)):["operator","operator"]},":":function(a){return a.match(/\s*\{/)?[null,"{"]:!1},$:function(a){return a.match(/^[\w-]+/),a.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(a){return a.eat("{")?[null,"interpolation"]:!1}},name:"css",helperType:"scss"}),a.defineMIME("text/x-less",{mediaTypes:f,mediaFeatures:h,propertyKeywords:j,nonStandardPropertyKeywords:k,colorKeywords:m,valueKeywords:o,fontProperties:q,allowNested:!0,tokenHooks:{"/":function(a,b){return a.eat("/")?(a.skipToEnd(),["comment","comment"]):a.eat("*")?(b.tokenize=c,c(a,b)):["operator","operator"]},"@":function(a){return a.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,!1)?!1:(a.eatWhile(/[\w\\\-]/),a.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"})});