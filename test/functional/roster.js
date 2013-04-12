/**
* This attempts to connect to the XMPP server and tests the roster features
**/
var config = require('jsconfig'),
	path = require('path'),
    defaultConfigPath = path.join(__dirname, "../../config.local.js");
config.defaults(defaultConfigPath);

function proceed(str){
	console.log(str);
}
config.load(function (args, opts) {
	var xmpp = require('../../lib/core/xmpp');
	var server  = require('../../lib/extension/models/server.js');
	
	var _ = require('underscore');
	var User = require('../../lib/extension/models/users.js').User;
	
	fixtures = [
	            ["cowboybkit@localhost", "123456"],
	            ["hung2@localhost", "123456"],
	            ]; // Fixtures 
	
	describe('Connect client', function(){
	    var cl = null;
	    
	    before(function(proceed) {
	        server.run(config, function() {
	            proceed();
	        });
	    });
	    
	    beforeEach(function(proceed){
	        var ready = _.after(fixtures.length, function() {
	            cl = new xmpp.Client({jid: "cowboybkit@localhost", password: "123456"});
	            cl.on('online', function () {
	                proceed();
	            });
	        });
	        _.each(fixtures, function(fixture) {
	            User.register(fixture[0], fixture[1], {
	                force: true,
	                success: ready,
	                error: function(err) {
	                    console.log("Couldn't add users.");
	                    process.exit(1);
	                }
	            });
	        });
	    });
	    
	    it('should be able grab the roster', function(done){
	        cl.on('stanza', function(stanza) {
	            var query = stanza.getChild('query', "jabber:iq:roster");
	            if(stanza.name === "iq" && query) {
	                done();
	            }
	        });
	        cl.send(new xmpp.Iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'}),function(){
	        	
	        });
	    });
	    it('should allow for addition of new items');
//	    it('should allow for deletion of roster items');
	    
	});

});

