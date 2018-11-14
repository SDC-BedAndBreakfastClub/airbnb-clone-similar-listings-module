
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
      res.status(200).send(results);
    }
  });
});

app.patch('/api/rooms/:listingId/similar_listings', (req, res) => {
  model.addListing(req.body, (err) => {
    if (err) {
      throw err;
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/api/rooms/:listingId/similar_listings', (req, res) => {
  const { listingId } = req.params;
  const changes = req.body;
  model.editListing(listingId, changes, (err, updated) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send(updated);
    }
  });
});

app.delete('/api/rooms/:listingId/similar_listings', (req, res) => {
  const { listingId } = req.params;
  model.deleteListing(listingId, (err) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
