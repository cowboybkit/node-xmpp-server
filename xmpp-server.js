#!/usr/bin/env node

var path = require('path'),
    config = require('jsconfig'),
    defaultConfigPath = path.join(__dirname, "config.local.js");
config.defaults(defaultConfigPath);

// environment parameters
config.set('env', {
    DOMAIN: 'domain',
    PORT: ['port', parseInt],
});

config.cli({
    domain: ['domain', ['d', "xmpp server domain",  'host']],
    port:   ['port',   ['p', "xmpp server port",  'number']],
    config: ['c', "load config file", 'path', defaultConfigPath],
    logger: ['logger', [false, "Log to stdout"]],
    websocket: ['websocket', [false, "Do not listen on websocket connections"]],
});

config.load(function (args, opts) {

    // preserve the old api with loading a config file from argv
    if(args.length > 0)
        opts.config = args[args.length - 1];

    if(opts.config !== defaultConfigPath)
        config.merge(require(opts.config));

    var server = require('./lib/extension/models/server.js');
    server.run(config, function() {
        // Server ready!
    });
});



