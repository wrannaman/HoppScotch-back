'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Places = mongoose.model('Places'),
	Points = mongoose.model('Points'),
	Messages  = mongoose.model('Messages'),
	moment = require('moment'),
	_ = require('lodash');

/**
* Returns data for the places we can find
*/
exports.findReturn = function (req, res) {
	console.log('findReturn');
	console.log(req.body.places);
	var placesArray = req.body.places;

	var foundPlaces = [];

	var getPlaceAndPush = function (placesArray, i) {
		Places.findOne({ 'place_id': placesArray[i].place_id}, function (err, place) {
			if (place) {
				console.log('found a place!');
				console.log(JSON.stringify(place));
				foundPlaces.push(place);
			}
		});
	};

	for (var i=0; i<placesArray.length; i++) {
		getPlaceAndPush(placesArray, i);
	}

	console.log("** found places **");
	console.log(foundPlaces);

	setTimeout(function () {
		if (foundPlaces == []) {
			res.json();
		} else {
			res.json(foundPlaces);
		}
	}, 1000);

};

exports.newPlace = function (req, res) {
	console.log('newPlace');
	var newPlace = new Places({ place_id: req.body.place, checkins: 1 });
	newPlace.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(newPlace);
		}
	});
};

exports.updateRating = function (req, res) {
	console.log('updateRating');
	console.log(req.body);
	// Add to points on map @ location whether checking in or creating the room.
	var point = new Points({'lat': req.body.lat, 'long': req.body.long});
	point.save(function (err){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});

	// Update Rating upon checking in
	Places.findOne({ '_id': req.body._id }, function (err, place) {
		console.log(place);
		var rating = place.rating;
		var newRating;

		if (place.checkins === 0) {
			newRating = (Number(req.body.rating)/20);
		} else {
			newRating = ((Number(rating)*Number(place.checkins)) + (Number(req.body.rating)/20))/Number(place.checkins + 1);
		}

		console.log('rating ' + rating);
		console.log('new Rating ' + newRating);
		console.log('req.body.rating' + req.body.rating);
		console.log('place.checkins' + place.checkins);
		var roundedRating = Math.round( newRating * 10 ) / 10;
		console.log(roundedRating);
		Places.findByIdAndUpdate(place._id, { $set: { rating: roundedRating }}, function (err, place) {
		  if (err) return errorHandler.getErrorMessage(err);
		  res.json(place);
		});
	});
};

exports.checkin = function (req, res) {
	console.log('checkin!');
	console.log(req.body);

	Places.findOne({place_id: req.body.place}, function (err, place) {
	    place.checkins += 1;
	    place.save(function (err) {
	        if(err) {
	            console.error('ERROR!');
	        }
	    });
	    res.json(place);
	});
};

exports.getPoints = function (req, res) {
	console.log('getPoints!');
	Points.find().exec(function(err, points) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		res.json(points);
	});
};

var cleanUpAll = function () {
	console.log('cleanupall');

	// remove old messages
	Messages.find({}).exec(function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].created).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].created).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				Messages.remove({_id: result[i]._id}, function (err) {
					console.log('removed');
				});
			} else {
				console.log('false');
			}
		}
	});

	// remove old points
	Points.find({}).exec(function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].created).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].created).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				Points.remove({_id: result[i]._id}, function (err) {
					console.log('removed');
				});
			} else {
				console.log('false');
			}
		}
	});

	// remove old places
	Places.find({}).exec(function(e,result){
		for (var i=0; i<result.length; i++) {
			console.log('difference for ' + i + " is : " + Number( moment(result[i].created).add('4', 'h')-moment(new Date()))/3600000);
			if (Number( moment(result[i].created).add('4', 'h')-moment(new Date())) <= 0 ) {
				console.log('true, delete');
				Places.remove({_id: result[i]._id}, function (err) {
					console.log('removed');
				});
			} else {
				console.log('false');
			}
		}
	});
};


var cleanUpAllLoop = function () {
	setTimeout(function () {
		cleanUpAllLoop();
		cleanUpAll();

	}, 3600000); // run every hour
}

cleanUpAllLoop();
