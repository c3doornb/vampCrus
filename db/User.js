const mongoose = require('mongoose');
const util = require('../lib/hashUtils');
const db = require('./index');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String,
  sessionHash: String
});

const User = mongoose.model('User', userSchema);

module.exports.addUser = (username, password, cb) => {
  User.findOne({username: username})
    .then(user => {
      if (user) {
        cb('user exists!');
      } else {
        const salt = util.createRandom32String();
        const hash = util.createHash(password, salt);
        User.create({username: username, password: hash, salt: salt})
          .then(user => {
            console.log('user', user);
            cb(null, user);
          });
      }
    }).catch(err => console.log('error', err));
}

module.exports.checkLogin = (username, password, cb) => {
  User.findOne({username: username})
    .then(user => {
      if (user) {
        const expected = user.password;
          cb(null, util.compareHash(password, expected, user.salt));
      } else {
        cb('Username not found');
      }
    });
}

module.exports.getUser = (userId) => {
  return User.findById(userId).select('username');
};

