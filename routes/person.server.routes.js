'use strict';

/**
 * Module dependencies.
 */
var person = require('../../app/controllers/person.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/person')
		.post(person.checkPerson);
	
	// once they learn, changed hasLearned to true
	app.route('/person/notNew')
		.post(person.notNew);
};