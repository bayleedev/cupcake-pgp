function send_message_to_sw(msg){
    return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        // Send message to service worker along with port for reply
        navigator.serviceWorker.controller.postMessage("Client 1 says '"+msg+"'", [msg_chan.port2]);
    });
}

navigator.serviceWorker.register('/pgp-sw.js').then(function(reg){
    console.log("SW registration succeeded. Scope is "+reg.scope);
}).catch(function(err){
    console.error("SW registration failed with error "+err);
});

send_message_to_sw('meow')
