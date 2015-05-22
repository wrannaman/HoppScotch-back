'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Person = mongoose.model('Person'),
	_ = require('lodash');

/**
 * Check if person has already learned
 */
exports.checkPerson = function(req, res) {
	console.log('checkPerson');
 	console.log(req.body);
	var uuid = req.body.uuid;
	console.log(uuid);

	Person.findOne({uuid: uuid}, function (err, person) {
	    console.log(person == null);
	    // if person is null return true to answer are they new
	    // add them to the person

	    if (person == null) {
	    	var newPerson = new Person(req.body);
	    	newPerson.save(function (err){
	    		if (err) {
	    			return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
	    		} else {
	    			res.json(true);
	    		}
	    	});
	    } else {
	    	res.json(false);
	    }
	});

	// var message = new Messages(req.body);
	// console.log(JSON.stringify(message));
	// message.save(function(err) {
	// 	if (err) {
	// 		return res.status(400).send({
	// 			message: errorHandler.getErrorMessage(err)
	// 		});
	// 	} else {
	// 		// return the added message
	// 		res.json(message);
	// 	}
	// });
};

exports.notNew = function (req, res) {
	console.log('notNew');
	var uuid = req.body.uuid;
	console.log(uuid);

	Person.findOne({uuid: uuid}, function (err, person) {
	    // if person is null return true to answer are they new
	    // add them to the person
	    person.hasLearned = true;
    	var newPerson = new Person(req.body);
    	person.save(function (err){
    		if (err) {
    			return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
    		} else {
    			res.json(true);
    		}
    	});
	    
	});
};
