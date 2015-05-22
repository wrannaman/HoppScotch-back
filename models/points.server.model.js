'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var PointsSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	lat: {
		type: Number,
		default: 0,
		required: 'Lat cannot be blank'
	},
	long: {
		type: Number,
		default: 0,
		required: 'Long cannot be blank'
	}
});

mongoose.model('Points', PointsSchema);