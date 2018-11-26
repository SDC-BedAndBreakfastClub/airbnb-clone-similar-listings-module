require('newrelic');
const cors = require('cors');
const express = require('express');
const path = require('path');
const connection = require('../data/index');

const app = express();
const port = 80;

app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/rooms/:listingId/similar_listings', (req, res) => {
  const currentListing = req.params.listingId;
  connection.get12(currentListing, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/rooms/:listingId/similar_listings', (req, res) => {
  connection.addListing(req.body, (err) => {
    if (err) {
      throw err;
    } else {
      res.sendStatus(201);
    }
  });
});

app.patch('/api/rooms/:listingId', (req, res) => {
  const currentListing = req.params.listingId;
  const changes = req.body;
  connection.editListing(currentListing, changes, (err, updated) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send(updated);
    }
  });
});

app.delete('/api/rooms/:listingId/', (req, res) => {
  const currentListing = req.params.listingId;
  connection.deleteListing(currentListing, (err) => {
    if (err) {
      throw err;
    } else {
      res.status(200);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
