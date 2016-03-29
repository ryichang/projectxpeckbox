var Post = require('../models/post.js')
	, User = require('../models/user.js')
  , auth = require('./auth')

module.exports = function(app) {
	app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function(err, user) {
			var post = new Post(req.body);
			post.save(function(err, post) {
				user.posts.unshift(post._id);
				user.save();
				res.send(post);				
			});
		})
	})
}
