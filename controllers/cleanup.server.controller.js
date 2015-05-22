'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Messages = mongoose.model('Messages'),
	Places = mongoose.model('Places'),
	Points = mongoose.model('Points'),
	_ = require('lodash');


exports.cleanUpAll = function () {
	console.log('cleanupall');
	// clean up messages
	Messages.find({}).sort('-created').exec(function(err, messages) {
		if (err) {
			// silent fail
		} else {
			console.log(JSON.stringify(messages));
		}
	});
};
