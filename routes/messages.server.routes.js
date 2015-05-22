'use strict';

/**
 * Module dependencies.
 */
var messages = require('../../app/controllers/messages.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/messages/newMessage')
		.post(messages.newMessage);

	app.route('/messages')
		.post(messages.listMessages);

	app.route('/messages/vote')
		.post(messages.vote);
};