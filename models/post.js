var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  title  : String,
  body   : String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;