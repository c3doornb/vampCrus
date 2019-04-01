const User = require('../../db/User');
const Session = require('../../db/Session');

const cookieName = 'vampcrusid';

module.exports.createSession = (req, res, next) => {
  //handle case if cookie available
  if (req.cookies && req.cookies[cookieName]) {
    Session.getSession(req.cookies[cookieName])
      .then(session => {
        // if session id does not exists
        if (!session) {
          Session.addSession(req.cookies[cookieName], () => next());
        // if session id exists
        } else {
          // if user is attached to session
          if (session.userId) {
            User.getUser(session.userId)
              .then(user => {
                if (user.username) {
                  req.session = {hash: session.hash, user: user.username};
                } else {
                  req.session = {hash: session.hash}
                }
                next();
              })
              // if user is not attached to session
            } else {
              req.session = {hash: session.hash};
              next();
            }
        }
      })
  //if cookie is not available
  } else {
    Session.addSession(undefined, (err, sessionHash) => {
      req.session = {hash: sessionHash};
      res.cookie(cookieName, sessionHash);
      next();
    })
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
module.exports.verifyLogin = (req, res, next) => {
  if (req.url !== '/login' && req.url !== '/create') {
    if (Session.isLoggedIn(req.session)) {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
}
