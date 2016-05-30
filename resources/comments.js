var Note = require('../models/comment.js'),
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {

	// get all comments
	app.get('/api/comments', auth.ensureAuthenticated, function(req, res) {
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all posts in the database
			User.find(function(err, notes) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(comments); // return all notes in JSON format
			});
		});
	});

	app.get('api/comments/:comment_id', auth.ensureAuthenticated, function (req,res) {
	        User.findById(req.userId).exec(function (err, user) {
	            Comment.findById({ _id: req.params.note_id}, function(err, note) {
	                if (err) { return res.status(404).send(err); }
	                res.send(comment); 
	            });
	        });
	    });

	app.put('/api/comments/:comment_id', auth.ensureAuthenticated, function(req,res){ 
            console.log('putroute', req.body);
            console.log('commentId', req.params.comment_id);
            Comment.findOneAndUpdate({ _id: req.params.comment_id}, req.body , function (err, comment) {
                // console.log("editRoute", comment);
                if (err) { return res.send(err); }
                // console.log('backend', comment);
                res.send(comment);
            });
        });

	app.post('/api/comments', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var comment = new Comment(req.body);
			comment.save(function(err, comment) {
				user.comments.unshift(comment._id);
				user.save();
				res.send(comment);				
			});
		});
	});



	app.delete('/api/comments/:comment_id', function(req, res) {
		Comment.findByIdAndRemove({
			_id : req.params.comment_id
		 }, function(err, comment) {
			if (err)
				res.send(err);

			// get and return all the comments after you create another
			User.findOneAndUpdate(
				{ comments: req.params.comment_id},
				{ "$pull": {"comments": req.params.comment_id}},
				// { "new": true},
				function (err, comment){
					if(err) {
						res.send(err);
					} else {
						console.log("OBjectID", comment);
						res.status(200).send('Find user and deleted');
					}
				});
			});
	});


};