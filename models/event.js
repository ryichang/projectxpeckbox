var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = Schema({
  title  : String,
  description: { type: String},
  location: { type: Object},
  date: { type: Date},
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  userId : [{type: Schema.Types.ObjectId, ref: 'User'}],
});


// MIDDLEWARE
EventSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var Event = mongoose.model('Event', EventSchema);

module.exports = Event;