!function(){function a(a){test.mode(a,d,Array.prototype.slice.call(arguments,1))}function b(a,b,c){for(var d=[b],e=1;c>=e;++e)d[e]=a.join(d[e-1]);return d}function c(a,b,c,d,e){for(var f=[d],g=1;e>=g;++g)f[g]=c[0]+a[g-1]+c[1]+b[g-1]+c[2]+f[g-1]+c[3];return f}var d=CodeMirror.getMode({indentUnit:2},"php");a("simple_test",'[meta <?php] [keyword echo] [string "aaa"]; [meta ?>]'),a("variable_interpolation_non_alphanumeric","[meta <?php]",'[keyword echo] [string "aaa$~$!$@$#$$$%$^$&$*$($)$.$<$>$/$\\$}$\\"$:$;$?$|$[[$]]$+$=aaa"]',"[meta ?>]"),a("variable_interpolation_digits","[meta <?php]",'[keyword echo] [string "aaa$1$2$3$4$5$6$7$8$9$0aaa"]',"[meta ?>]"),a("variable_interpolation_simple_syntax_1","[meta <?php]",'[keyword echo] [string "aaa][variable-2 $aaa][string .aaa"];',"[meta ?>]"),a("variable_interpolation_simple_syntax_2","[meta <?php]",'[keyword echo] [string "][variable-2 $aaaa][[',"[number 2]",']][string aa"];','[keyword echo] [string "][variable-2 $aaaa][[',"[number 2345]",']][string aa"];','[keyword echo] [string "][variable-2 $aaaa][[',"[number 2.3]",']][string aa"];','[keyword echo] [string "][variable-2 $aaaa][[',"[variable aaaaa]",']][string aa"];','[keyword echo] [string "][variable-2 $aaaa][[',"[variable-2 $aaaaa]",']][string aa"];','[keyword echo] [string "1aaa][variable-2 $aaaa][[',"[number 2]",']][string aa"];','[keyword echo] [string "aaa][variable-2 $aaaa][[',"[number 2345]",']][string aa"];','[keyword echo] [string "aaa][variable-2 $aaaa][[',"[number 2.3]",']][string aa"];','[keyword echo] [string "aaa][variable-2 $aaaa][[',"[variable aaaaa]",']][string aa"];','[keyword echo] [string "aaa][variable-2 $aaaa][[',"[variable-2 $aaaaa]",']][string aa"];',"[meta ?>]"),a("variable_interpolation_simple_syntax_3","[meta <?php]",'[keyword echo] [string "aaa][variable-2 $aaaa]->[variable aaaaa][string .aaaaaa"];','[keyword echo] [string "aaa][variable-2 $aaaa][string ->][variable-2 $aaaaa][string .aaaaaa"];','[keyword echo] [string "aaa][variable-2 $aaaa]->[variable aaaaa][string [[2]].aaaaaa"];','[keyword echo] [string "aaa][variable-2 $aaaa]->[variable aaaaa][string ->aaaa2.aaaaaa"];',"[meta ?>]"),a("variable_interpolation_escaping","[meta <?php] [comment /* Escaping */]",'[keyword echo] [string "aaa\\$aaaa->aaa.aaa"];','[keyword echo] [string "aaa\\$aaaa[[2]]aaa.aaa"];','[keyword echo] [string "aaa\\$aaaa[[asd]]aaa.aaa"];','[keyword echo] [string "aaa{\\$aaaa->aaa.aaa"];','[keyword echo] [string "aaa{\\$aaaa[[2]]aaa.aaa"];','[keyword echo] [string "aaa{\\aaaaa[[asd]]aaa.aaa"];','[keyword echo] [string "aaa\\${aaaa->aaa.aaa"];','[keyword echo] [string "aaa\\${aaaa[[2]]aaa.aaa"];','[keyword echo] [string "aaa\\${aaaa[[asd]]aaa.aaa"];',"[meta ?>]"),a("variable_interpolation_complex_syntax_1","[meta <?php]",'[keyword echo] [string "aaa][variable-2 $]{[variable aaaa]}[string ->aaa.aaa"];','[keyword echo] [string "aaa][variable-2 $]{[variable-2 $aaaa]}[string ->aaa.aaa"];','[keyword echo] [string "aaa][variable-2 $]{[variable-2 $aaaa][[',"  [number 42]",']]}[string ->aaa.aaa"];','[keyword echo] [string "aaa][variable-2 $]{[variable aaaa][meta ?>]aaaaaa'),a("variable_interpolation_complex_syntax_2","[meta <?php] [comment /* Monsters */]",'[keyword echo] [string "][variable-2 $]{[variable aaa][comment /*}?>} $aaa<?php } */]}[string ->aaa.aaa"];','[keyword echo] [string "][variable-2 $]{[variable aaa][comment /*}?>*/][[','  [string "aaa][variable-2 $aaa][string {}][variable-2 $]{[variable aaa]}[string "]',']]}[string ->aaa.aaa"];','[keyword echo] [string "][variable-2 $]{[variable aaa][comment /*} } $aaa } */]}[string ->aaa.aaa"];');var e=b(['[string "][variable-2 $]{[variable aaa] [operator +] ','}[string "]'],'[comment /* }?>} */] [string "aaa][variable-2 $aaa][string .aaa"]',10);a("variable_interpolation_complex_syntax_3_1","[meta <?php] [comment /* Recursive monsters */]","[keyword echo] "+e[4]+";","[keyword echo] "+e[7]+";","[keyword echo] "+e[8]+";","[keyword echo] "+e[5]+";","[keyword echo] "+e[1]+";","[keyword echo] "+e[6]+";","[keyword echo] "+e[9]+";","[keyword echo] "+e[0]+";","[keyword echo] "+e[10]+";","[keyword echo] "+e[2]+";","[keyword echo] "+e[3]+";",'[keyword echo] [string "end"];',"[meta ?>]");var f=b(['[string "a][variable-2 $]{[variable aaa] [operator +] '," [operator +] ",'}[string .a"]'],'[comment /* }?>{{ */] [string "a?>}{{aa][variable-2 $aaa][string .a}a?>a"]',5);a("variable_interpolation_complex_syntax_3_2","[meta <?php] [comment /* Recursive monsters 2 */]","[keyword echo] "+f[0]+";","[keyword echo] "+f[1]+";","[keyword echo] "+f[5]+";","[keyword echo] "+f[4]+";","[keyword echo] "+f[2]+";","[keyword echo] "+f[3]+";",'[keyword echo] [string "end"];',"[meta ?>]");var g=c(e,f,['[string "a][variable-2 $]{[variable aaa] [operator +] '," [operator +] "," [operator +] ",'}[string .a"]'],'[comment /* }?>{{ */] [string "a?>}{{aa][variable-2 $aaa][string .a}a?>a"]',4);a("variable_interpolation_complex_syntax_3_3","[meta <?php] [comment /* Recursive monsters 2 */]","[keyword echo] "+g[4]+";","[keyword echo] "+g[0]+";","[keyword echo] "+g[3]+";","[keyword echo] "+g[1]+";","[keyword echo] "+g[2]+";",'[keyword echo] [string "end"];',"[meta ?>]")}();