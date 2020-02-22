const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const controller = require('./controller.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/ping', controller.route1);
app.get('/api/posts', controller.route2);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;