var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: true
 });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected!');
});

var usersSchema = mongoose.Schema({
  username: String,
  password: String
});

var Users  = mongoose.model('users', usersSchema);


module.exports = { 
  Users
}