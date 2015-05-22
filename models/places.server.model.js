'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Places Schema
 */
var PlacesSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	checkins: {
		type: Number,
		default: 0
	},
	comments: {
		type: Number,
		default: 0
	},
	rating: {
		type: Number,
		default: 0
	},
	place_id: {
		type: String,
		default: ''
	}
});

mongoose.model('Places', PlacesSchema);