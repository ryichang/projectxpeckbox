var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  title  : String,
  body   : String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  user : [{type: Schema.Types.ObjectId, ref: 'User'}],
  start : Boolean,
  done  : Boolean
});


// MIDDLEWARE
PostSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

PostSchema.pre('remove', function(next){
    this.model('User').update(
        {_id: {$in: this.users}}, 
        {$pull: {posts: this._id}}, 
        {multi: true},
        next
    );
});


var Post = mongoose.model('Post', PostSchema);

module.exports = Post;