const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const User = require('../db/User');
const Session = require('../db/Session');

const Auth = require('./middleware/auth');
const CookieParser = require('./middleware/cookieParser');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(CookieParser);
app.use(Auth.createSession);
app.use(Auth.verifyLogin);
app.use(express.static(__dirname + '/../client/dist'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/login.html'));
});

app.post('/login', (req, res) => {
  User.checkLogin(req.body.username, req.body.password, (err, matched) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else if (matched) {
      console.log(req.body.username, 'has logged in!');
      req.session.user = req.body.username;
      res.redirect('/');
    } else {
      console.log('username or password incorrect');
      res.sendFile(path.join(__dirname + '/../client/dist/login.html'));
    }
  });
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/create.html'));
});

app.post('/create', (req, res) => {
  console.log(req.body.username, ' is trying to create an account!');
  User.addUser(req.body.username, req.body.password, (err, user) => {
    Session.setUser(req.session.hash, user._id)
      .then(data => {
        if (err) {
          res.send(err);
        } else {
          console.log(req.body.username, ' created!');
          req.session.user = req.body.username;
          res.redirect('/');
        }
      });
  })
});



app.listen(port, () => {
  console.log('listening on port:', port);
});
