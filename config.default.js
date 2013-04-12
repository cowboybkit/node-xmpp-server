module.exports = {
    port: 5222,
    domain: 'localhost',
    redis:{
        server: "127.0.0.1",
    	port : 6379
    },
    // logging
    logger: false,

    //tls: {
    //    keyPath: '/etc/xmpp-server/tls/localhost-key.pem',
    //    certPath: '/etc/xmpp-server/tls/localhost-cert.pem'
    //},
    
    // Listen on websockets
    websocket: {
        port: 5280
    }
};
