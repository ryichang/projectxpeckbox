var Note = require('../models/note.js'),
	Post = require('../models/post.js'),
	Event = require('../models/event.js'),
	Comment = require('../models/comment.js')
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {
	app.post('/api/post/:post_id/comments', auth.ensureAuthenticated, function (req, res){
			// console.log("comment passed back", req.body)
			// console.log('post', req.body.post)
			User.findById(req.userId).exec(function(err, user){
				Post.findById(req.body.post)
				.populate('comments')
				.populate('userId')
				.exec(function(err,post){
					// console.log('commentor email in post: ', post.user.email);
					var comment = new Comment(req.body);
					comment.save(function(err, comment){
						post.comments.unshift(comment._id);
						post.save();
						Comment.findById(comment._id)
						.populate('userId')
						.exec(function (err, data){
						console.log('Data', data.userId);
						res.send(data);
						});
					});
				});	
			});
		});

	app.put('/api/posts/:post_id/comments/:comment_id', auth.ensureAuthenticated, function(req,res){ 
	    console.log('putroute', req.body);
	    console.log('commentId', req.params.comment_id);
	        Comment.findOneAndUpdate({ _id: req.params.comment_id}, req.body , function (err, comment) {
	            // console.log("editRoute", note);
	            if (err) { return res.send(err); }
	            // console.log('backend', note);
	            res.send(comment);
	            });
	     });

	app.delete('/api/posts/:post_id/comments/:comment_id', function(req, res) {
		Comment.findByIdAndRemove({
			_id : req.params.comment_id
		 }, function(err, post) {
			if (err)
				res.send(err);

			// Delete Post in User
			Post.findOneAndUpdate(
				{ comments: req.params.comment_id},
				{ "$pull": {"comments": req.params.comment_id}},
	
				function (err, comment){
					if(err) {
						res.send(err);
					} else {
						res.status(200).send("comment is deleted", comment);
						
					}
					
				});
			});
	});

	app.post('/api/event/:event_id/comments', auth.ensureAuthenticated, function (req, res){
			// console.log("comment passed back", req.body)
			// console.log('post', req.body.post)
			User.findById(req.userId).exec(function(err, user){
				Event.findById(req.body.event)
				.populate('comments')
				.populate('userId')
				.exec(function(err,event){
					// console.log('commentor email in post: ', post.user.email);
					var comment = new Comment(req.body);
					comment.save(function(err, comment){
						event.comments.unshift(comment._id);
						event.save();
						Comment.findById(comment._id)
						.populate('userId')
						.exec(function (err, data){
						console.log('Data', data.userId);
						res.send(data);
						});
					});
				});	
			});
		});

	app.put('/api/events/:event_id/comments/:comment_id', auth.ensureAuthenticated, function(req,res){ 
	    console.log('putroute', req.body);
	    console.log('commentId', req.params.comment_id);
	        Comment.findOneAndUpdate({ _id: req.params.comment_id}, req.body , function (err, comment) {
	            // console.log("editRoute", note);
	            if (err) { return res.send(err); }
	            // console.log('backend', note);
	            res.send(comment);
	            });
	     });

	app.delete('/api/events/:event_id/comments/:comment_id', function(req, res) {
		Comment.findByIdAndRemove({
			_id : req.params.comment_id
		 }, function(err, event) {
			if (err)
				res.send(err);

			// Delete Event in User
			Event.findOneAndUpdate(
				{ comments: req.params.comment_id},
				{ "$pull": {"comments": req.params.comment_id}},
	
				function (err, comment){
					if(err) {
						res.send(err);
					} else {
						res.status(200).send("comment is deleted", comment);
						
					}
					
				});
			});
	});

};