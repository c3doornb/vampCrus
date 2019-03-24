const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, () => {
  console.log('listening on port:', port);
})

app.post('/signIn', (req, res) => {
  console.log(req.body.username, ' is logging in!');
  res.status(201).send(JSON.stringify({approved:true}));
})
