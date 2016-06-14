var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = Schema({
  title  : String,
  description: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  owner  : {type: Schema.Types.ObjectId, ref: 'User'},
  users  : [{type: Schema.Types.ObjectId, ref: 'User'}],
  events : [{type: Schema.Types.ObjectId, ref: 'Event'}],
  comments         : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  color  : {type: String, default: "default"},
});


// MIDDLEWARE
GroupSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;