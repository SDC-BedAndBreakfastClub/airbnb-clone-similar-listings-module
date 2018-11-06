
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const model = require('../data/index');

const app = express();
const port = process.env.PORT || 3003;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/rooms/:listingId/similar_listings', (req, res) => {
  model.get12((err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
