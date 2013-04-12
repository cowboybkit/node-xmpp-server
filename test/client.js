var xmpp = require('simple-xmpp');

xmpp.on('online', function() {
    console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
    xmpp.send(from, 'echo: ' + message);
});

xmpp.on('error', function(err) {
    console.error(err);
});

xmpp.on('subscribe', function(from) {
if (from === 'user@gmail.com') {
    xmpp.acceptSubscription(from);
    }
});
setTimeout(function(){
	xmpp.connect({
	    jid         : 'user@gmail.com',
	    password    : 'something',
	    host        : 'talk.google.com',
	    port        : 5222
	});
	
},5000);
setTimeout(function(){
	console.log('get roster');
	xmpp.getRoster();
},15000);