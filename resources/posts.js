var Post = require('../models/post.js'),
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {

	// get all posts
	app.get('/api/posts', function(req, res) {

		// use mongoose to get all posts in the database
		Post.find(function(err, posts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.json(posts); // return all posts in JSON format
		});
	});

	// create post and send back all posts after creation
	app.post('/api/posts', function(req, res) {

		// create a post, information comes from AJAX request from Angular
		Post.create({
			title : req.body.title,
			body: req.body.body,
		}, function(err, post) {
			if (err)
				res.send(err);

			// get and return all the posts after you create another
			Post.find(function(err, posts) {
				if (err)
					res.send(err);
				res.json(posts);
			});
		});

	});

	// delete a post
	app.delete('/api/posts/:post_id', function(req, res) {
		Post.remove({
			_id : req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);

			// get and return all the posts after you create another
			Post.find(function(err, posts) {
				if (err)
					res.send(err);
				res.json(posts);
			});
		});
	});
};


