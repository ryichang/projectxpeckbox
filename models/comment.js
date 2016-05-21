var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = Schema({
  body   : String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  userId : [{type: Schema.Types.ObjectId, ref: 'User'}],
  posts         : [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  notes         : [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  events        : [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});


// MIDDLEWARE
CommentSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;