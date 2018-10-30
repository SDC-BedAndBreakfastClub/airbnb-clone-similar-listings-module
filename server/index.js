const express = require('express');

const app = express();
const port = 3003;
const db = require('../data/index.js');
// const path = require('path');
// const bodyParser = require('body-parser');

app.use('/', express.static('public'));

app.get('/listings', (req, res) => {
  db.getAll();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
