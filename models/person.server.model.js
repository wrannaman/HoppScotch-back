'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Person Schema
 */
var PersonSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	uuid: {
		type: String,
		default: '',
		required: 'UUID cannot be blank'
	},
	hasLearned: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Person', PersonSchema);