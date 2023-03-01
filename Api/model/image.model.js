const mongoose = require('mongoose');


const user = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image:{type: String}
});


module.exports = mongoose.model('User', user);