function getFile(a,b){postMessage({type:"getFile",name:a,id:++nextId}),pending[nextId]=b}function startServer(a,b,c){c&&importScripts.apply(null,c),server=new tern.Server({getFile:getFile,async:!0,defs:a,plugins:b})}var server;this.onmessage=function(a){var b=a.data;switch(b.type){case"init":return startServer(b.defs,b.plugins,b.scripts);case"add":return server.addFile(b.name,b.text);case"del":return server.delFile(b.name);case"req":return server.request(b.body,function(a,c){postMessage({id:b.id,body:c,err:a&&String(a)})});case"getFile":var c=pending[b.id];return delete pending[b.id],c(b.err,b.text);default:throw new Error("Unknown message type: "+b.type)}};var nextId=0,pending={},console={log:function(a){postMessage({type:"debug",message:a})}};