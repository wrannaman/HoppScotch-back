'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Messages = mongoose.model('Messages'),
	Places = mongoose.model('Places'),
	_ = require('lodash');

/**
 * Create a new message
 */
exports.newMessage = function(req, res) {
 	console.log('newMessage');
 	console.log(req.body);
	var message = new Messages(req.body);
	console.log(JSON.stringify(message));

	// update the place to increment comments
	var place_id = req.body.place_id;
	Places.findOne({place_id: place_id}, function (err, place) {
	    place.comments += 1;
	    place.save(function (err) {
	        if(err) {
	            console.error('ERROR!');
	        }
	    });
	});

	message.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// return the added message
			res.json(message);
		}
	});
};

exports.listMessages = function (req, res) {
	console.log('listMessages');
	console.log(req.body);
	Messages.find({'place_id': req.body.place_id}).sort('-created').exec(function(err, messages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(JSON.stringify(messages));
			res.json(messages);
		}
	});
};

exports.vote = function (req, res) {
	console.log('voting!');
	console.log(req.body);
	console.log(req.body._id);
	var vote = Number(req.body.vote);
	Messages.findById(req.body._id).exec(function(err, messages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(messages);
			var currentPoints = messages.points;
			var newPoints = currentPoints + vote;
			console.log('currentPoints: ', currentPoints);
			console.log('new points: ', newPoints);


			messages.update({points: newPoints}).exec();
			Messages.where({ _id: messages._id }).update({ $set: { points: newPoints }});
			return res.json(1);
		}
	});
};