const mongoose = require('mongoose');
const util = require('../lib/hashUtils');
const db = require('./index');

const sessionSchema = new mongoose.Schema({
  hash: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Session = mongoose.model('Session', sessionSchema);

module.exports.createSessionHash = () => util.createHash(util.createRandom32String());

module.exports.getSession = (sessionHash) => {
  return Session.findOne({hash: sessionHash});
}

module.exports.addSession = (sessionHash, cb) => {
  sessionHash = sessionHash || module.exports.createSessionHash();
  console.log(sessionHash);
  Session.find({hash: sessionHash})
    .then(session => {
      if (session.length) {
        cb('session exists!');
      } else {
        Session.create({hash: sessionHash, userId: null})
          .then(session => {
            cb(null, sessionHash);
          })
      }
    }).catch(err => console.log('error', err));
}

module.exports.setUser = (sessionHash, userId) => {
  return Session.updateOne({hash: sessionHash}, {userId: userId});
}

module.exports.getUserId = (sessionHash) => {
  return Session.findOne({sessionHash: sessionHash}).select('userId');
};

module.exports.isLoggedIn = (session) => {
  if (!session)
    return false;
  else
    return !!session.user;
}

