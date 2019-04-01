const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vampCrusade');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});
