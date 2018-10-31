
const bodyParser = require('body-parser');
const express = require('express');
const model = require('../data/index');

const app = express();
const port = 3003;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/rooms/', (req, res) => {
  model.get12((err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
