var util = require('util'),
	path = require('path'),
	config = require('jsconfig'),
    defaultConfigPath = path.join(__dirname, "../config.default.js");
config.defaults(defaultConfigPath);



config.load(function (args, opts) {

	var User = require('../lib/extension/models/users.js').User;
	var argv = process.argv;
	
	if (argv.length != 4) {
		util.puts('Usage: node add_user.js <my-jid> <my-password>');
		process.exit(1);
	}
	User.register(argv[2], argv[3], {
	    success: function() {
	        console.log(argv[2] + " added.");
	        process.exit(0);
	    },
	    error: function() {
	        console.log(argv[2] + " couldn't ve added. (conflict)");
	        process.exit(1);
	    }
	})

});