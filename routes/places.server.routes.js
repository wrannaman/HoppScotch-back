'use strict';

/**
 * Module dependencies.
 */
var places = require('../../app/controllers/places.server.controller');
var cleanup = require('../../app/controllers/cleanup.server.controller');

module.exports = function(app) {
	// Places Routes
	app.route('/places')
		.get(places.findReturn)
		.post(places.findReturn); // this doesn't create, just get's them all

	// create a new place for a user that is actually there
	app.route('/places/newPlace')
		.post(places.newPlace);

	app.route('/places/updateRating')
		.post(places.updateRating);

	app.route('/places/checkin')
		.post(places.checkin);

	app.route('/places/getPoints')
		.get(places.getPoints)
};