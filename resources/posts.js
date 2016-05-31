var Post = require('../models/post.js'),
	User = require('../models/user.js'),
	Comment = require('../models/comment.js'),
    auth = require('./auth');

module.exports = function(app) {

	// get all posts
	app.get('/api/posts', auth.ensureAuthenticated, function(req, res) {
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all posts in the database
			User.find(function(err, posts) {

				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				res.json(posts); // return all posts in JSON format
			});
		});
	});


	// app.get('/api/posts/:post_id', auth.ensureAuthenticated, function(req, res){
	// 	User.findById(req.userId).exec(function(err, user){
	// 		Post.findById(req.params.post._id, function(err, post){
	// 			if (err) {res.status(404).send(err);}
	// 			res.send(post);
	// 		});
	// 	});
	// });
	app.get('/api/posts/:post_id', auth.ensureAuthenticated, function (req,res) {
	        User.findById(req.userId).exec(function (err, user) {
	            Post.findById(req.params.post_id)
	            	.populate({
	            		path: 'comments', 
	            		populate: {
	            			path:'userId', 
	            			model: 'User'
	            		}
	            	}) 
	            	.populate('userId')
	            	    .exec(function(err, post) {
	            	        if (err) { return res.status(404).send(err); }
	            	        res.send(post);
	            	       
	            	    });
	            	});

	});

	//  app.get('/api/posts/:id',function(req,res){   
	//   Post.findById(req.params.post._id)
	//     .populate('user')
	//     .exec(function(err, post) {
	//     if (err) { return res.status(404).send(err); }
	//     res.send(post); 
	//   });
	// });

	 // UPDATE
	// app.put('/api/posts/:id', function(req,res){ 
	//   console.log('hitting api/posts/:id path');
	//   Post.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true }, function (err, post) {
	//     if (err) { return res.send(err); }
	//     res.send(post);
	//   });
	// });

	// app.put('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res){ 
	//         Post.findOneAndUpdate({ _id: req.params.post_id}, req.query.post , {new: true}, function (err, post) {
	//             // console.log("editRoute", post);
	//             if (err) { return res.send(err); }
	//             console.log('backend',post);
	//             res.send(post);
	//         });
	//     });
    app.put('/api/posts/:post_id', auth.ensureAuthenticated, function(req,res){ 
            console.log('putroute', req.body);
            console.log('postId', req.params.post_id);
            Post.findOneAndUpdate({ _id: req.params.post_id}, req.body , function (err, post) {
                // console.log("editRoute", post);
                if (err) { return res.send(err); }
                // console.log('backend',post);
                res.send(post);
            });
        });

  	// app.put('/api/posts/:id', auth.ensureAuthenticated, function(req,res){ 
  	//     Post.findOneAndUpdate({ _id: req.params.post_id}, req.query.post, function (err, post) {
  	//         console.log("editRoute", post);
  	//         if (err) { return res.send(err); }
  	//         res.send(post);
   //      });
   //  });

    // app.put('/api/posts/:post_id', function(req, res) {
    // 	Post.findByIdAndRemove({
    // 		_id : req.params.post_id
    // 	 }, function(err, post) {
    // 		if (err)
    // 			res.send(err);

    // 		// get and return all the posts after you create another
    // 		User.findOneAndUpdate(
    // 			{ posts: req.params.post_id},
    // 			// { "new": true},
    // 			function (err, post){
    // 				if(err) {
    // 					res.send(err);
    // 				} else {
    // 					console.log("OBjectID", post);
    // 					res.status(200).send('Find user and deleted');
    // 				}
    				
    // 			});
    // 		});
    // });

	// create post and send back all posts after creation
	// app.post('/api/posts', auth.ensureAuthenticated, function(req, res) {
	// 	User.findById(req.userId).exec(function(err, user) {
	// 	// create a post, information comes from AJAX request from Angular
	// 		Post.create({
	// 			title : req.body.title,
	// 			body : req.body.body,
	// 			owner : req.userId,
	// 			start : false,
	// 			done : false
	// 		}, function(err, post) {
	// 			if (err)
	// 				res.send(err);

	// 			// get and return all the posts after you create another
	// 			Post.find(function(err, posts) {
	// 				if (err)
	// 					res.send(err);
	// 				res.json(posts);
	// 			});
	// 		});
	// 	});	
	// });


	// app.post('/api/posts', auth.ensureAuthenticated, function(req, res) {
	// 	User.findById(req.userId).exec(function(err, user) {
	// 	// create a post, information comes from AJAX request from Angular
	// 		Post.create({
	// 			title : req.body.title,
	// 			body : req.body.body,
	// 			owner : req.userId,
	// 			start : false,
	// 			done : false
	// 		}, function(err, post) {
	// 			if (err)
	// 				res.send(err);

	// 			// get and return all the posts after you create another
	// 			Post.create(function(err, posts) {
	// 				user.posts.unshift();
	// 				user.save();
	// 				res.send(post);
	// 			});
	// 		});
	// 	});	
	// });


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



	// // delete a post
	// app.delete('/api/posts/:post_id', function(req, res) {
	// 	Post.remove({
	// 		_id : req.params.post_id
	// 	}, function(err, post) {
	// 		if (err)
	// 			res.send(err);

	// 		// get and return all the posts after you create another
	// 		User.post.find(function(err, posts) {
	// 			if (err)
	// 				res.send(err);
	// 			res.send(posts);
	// 		});
	// 	});
	// });

	// delete a todo
	// app.delete('/api/posts/:post_id', function(req, res) {
	// 	Post.remove({
	// 		_id : req.params.post_id
	// 	}, function(err, post) {
	// 		if (err)
	// 			res.send(err);

	// 		// get and return all the todos after you create another
	// 		Post.find(function(err, posts) {
	// 			if (err)
	// 				res.send(err);
	// 			res.json(posts);
	// 		});
	// 	});
	// });

	app.delete('/api/posts/:post_id', function(req, res) {
		Post.findByIdAndRemove({
			_id : req.params.post_id
		 }, function(err, post) {
			if (err)
				res.send(err);

			// Delete Post in User
			User.findOneAndUpdate(
				{ posts: req.params.post_id},
				{ "$pull": {"posts": req.params.post_id}},
				// { "new": true},
				function (err, post){
					if(err) {
						res.send(err);
					} else {
						console.log("OBjectID", post);
						Comment.remove({ post: req.params.post_id},
							function(err, comment){
								if(err){
									console.log(err);
									return res.send(err);
								}
							console.log('comment delete', comment);
							});
						res.status(200).send('Find user and deleted');
					}
					
				});
			});
	});


};


