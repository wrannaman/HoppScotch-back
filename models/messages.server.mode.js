'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MessagesSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	place_id: {
		type: String,
		default: '',
		required: 'Place_id must match actual place_id'
	},
	message: {
		type: String,
		default: ''
	},
	points: {
		type: Number,
		default: 0
	}
});

mongoose.model('Messages', MessagesSchema);