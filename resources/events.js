var Event = require('../models/event.js'),
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {

	// get all events
	app.get('/api/events', auth.ensureAuthenticated, function(req, res) {
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all posts in the database
			User.find(function(err, events) {
				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);
				console.log(events);
				res.json(events); // return all posts in JSON format
			});
		});
	});


	app.post('/api/events', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var event = new Event(req.body);
			event.save(function(err, event) {
				if (err) 
					res.send(err);
				user.events.unshift(event._id);
				user.save();
				res.send(event);				
			});
		});
	});

	

	app.delete('/api/events/:event_id', function(req, res) {
		Event.findByIdAndRemove({
			_id : req.params.event_id
		 }, function(err, event) {
			if (err)
				res.send(err);

			// find User and pull event from events array in User
			User.findOneAndUpdate(
				{ events: req.params.event_id},
				{ "$pull": {"events": req.params.event_id}},
				function (err, event){
					if(err) {
						res.send(err);
					} else {
						console.log("OBjectID", event);

						// get and return all the events after you create another
						res.status(200).send('Find user and deleted');
					}
					
				});
			});
	});


};
