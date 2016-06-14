var Group = require('../models/group.js'),
	Event = require('../models/event.js'),
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js'),
    auth = require('./auth');

module.exports = function(app) {

	
	// get all groups
	app.get('/api/groups', auth.ensureAuthenticated, function(req, res) {
		console.log("HIT API")
		User.findById(req.userId).exec(function(err, user) {
			// use mongoose to get all groups in the database
			Group.find({users: req.userId}).exec(function(err, groups){
				console.log('groups are', groups);
				res.send(groups);
			});

			// User.find(function(err, groups) {

			// 	// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			// 	if (err)
			// 		res.send(err);

			// 	res.json(groups); // return all posts in JSON format
			// });
		});
	});

	app.get('/api/groups/:group_id', auth.ensureAuthenticated, function (req,res) {
	    User.findById(req.userId).exec(function(err,user){
	            Group.findById(req.params.group_id)
	            	.populate({
	            		path: 'comments', 
	            		populate: {
	            			path:'userId', 
	            			model: 'User',
	            		}
	            	})
	            	.populate({
	            		path: 'events', 
	            		populate: {
	            			path:'userId', 
	            			model: 'User',
	            		}
	            	})
	            	.populate('userId')
	            	    .exec(function(err, group) {
	            	        if (err) { return res.status(404).send(err); }
	            	        res.send(group);
	 
	            	    });
	    });
	});


	//UPDATE GROUP
	app.put('/api/groups/:group_id', auth.ensureAuthenticated, function(req,res){ 
	    console.log('putroute', req.body);
	    console.log('groupId', req.params.group_id);
	        Group.findOneAndUpdate({ _id: req.params.group_id}, req.body , function (err, group) {
	            // console.log("editRoute", group;
	            if (err) { return res.send(err); }
	            // console.log('backend', group);
	           
	            group.save();
	            res.send(group);
	        });
	});


	//WHEN USER JOIN USE POST ROUTE TO GROUP
	app.post('/api/groups/:group_id', auth.ensureAuthenticated, function(req,res){ 
	    console.log('putroute', req.body);
	    console.log('groupId', req.params.group_id);
	        Group.findOneAndUpdate({ _id: req.params.group_id}, req.body , function (err, group) {
	            // console.log("editRoute", group;
	            if (err) { return res.send(err); }
	            // console.log('backend', group);
	            group.users.unshift(req.body.users);
	            group.save();
	            res.send(group);
	        });
	});

	// app.post('/api/groups/:group_id', auth.ensureAuthenticated, function(req, res){
	// 	console.log('comment is', req.body)
	// });

	// app.post('/api/groups/:id',auth.ensureAuthenticated, function(req, res){
	// 	console.log(req.body.groups)
	// 	Group.findById({_id : req.params.group_id}).exec(function(err, group){
	// 		console.log('group found', group)
	// 		group.comments.unshift(req.body.owner, req.body.groups)
	// 		group.save();
	// 		res.send(group)
	// 	})
	// })

	app.post('/api/groups/', auth.ensureAuthenticated, function (req,res) {
		Group.findById(req.body.groups).exec(function(err, group) {
			if (err)
				res.send(err);
			var group = new Group(req.body)
			// group.owner.unshift(req.body.owner)
			// group.users.unshift(req.body.user, req.body.groups)
			group.save();
			res.send(group)
		});
	});

	// app.post('/api/notes', auth.ensureAuthenticated, function (req,res) {
	// 	User.findById(req.userId).exec(function(err, user) {
	// 		var note = new Note(req.body);
	// 		note.save(function(err, note) {
	// 			user.notes.unshift(note._id);
	// 			user.save();
	// 			res.send(note);				
	// 		});
	// 	});
	// });

	app.delete('/api/groups/:group_id', function(req, res) {
		Group.findByIdAndRemove({ _id : req.params.group_id}, function(err, group) {
			if (err)
				res.send(err); 
			Comment.remove({ groupId : req.params.group_id})
			.exec(function(err, result) {
				if (err)
				 res.send(err)
			})
			Event.remove({ groupId : req.params.group_id})
			.exec(function(err, result) {
				if (err)
				 res.send(err)
				 res.status(200).send('Group deleted')
			})
		});
		
	});

	// app.delete('/api/groups/:group_id', function(req, res) {
	// 	Group.findByIdAndRemove({
	// 		_id : req.params.group_id
	// 	 }, function(err, group) {
	// 		if (err)
	// 			res.send(err);

	// 		// Delete Group in User
	// 		User.findOneAndUpdate(
	// 			{ groups: req.params.group_id},
	// 			{ "$pull": {"events": req.params.group_id}},
				
	// 			function (err, group){
	// 				if(err) {
	// 					res.send(err);
	// 				} else {
	// 					console.log("OBjectID", group);
	// 					Comment.remove({ event: req.params.group_id},
	// 						function(err, comment){
	// 							if(err){
	// 								console.log(err);
	// 								return res.send(err);
	// 							}
	// 						console.log('comment delete', comment);
	// 						});
	// 					res.status(200).send('Find user and deleted');
	// 				}
					
	// 			});
	// 		});
	// });

};
