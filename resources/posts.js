var Post = require('../models/post.js'),
	User = require('../models/user.js'),
    auth = require('./auth');

module.exports = function(app) {

	//CREATE EVENT
	app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var post = new Post(req.body);
			post.save(function(err, post) {
				user.posts.unshift(post._id);
				user.save();
				res.send(post);				
			});
		});
	});

	app.delete('/api/posts/:id', function(req,res) {
		Post.findById({ _id: req.params.id}).remove().exec();
		res.sendStatus(200);
	}
};
