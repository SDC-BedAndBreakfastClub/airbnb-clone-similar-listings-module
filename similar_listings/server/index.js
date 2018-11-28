require('newrelic');
const cors = require('cors');
const express = require('express');
const path = require('path');
const connection = require('../data/index');

const app = express();
const port = process.env.PORT || 80;

app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/rooms/:listingId/similar_listings', (req, res) => {
  const { listingId } = req.params;
  connection.get12(listingId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/api/rooms/:listingId/similar_listings', (req, res) => {
  connection.addListing(req.body, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.sendStatus(201);
    }
  });
});

app.patch('/api/rooms/:listingId', (req, res) => {
  const { listingId } = req.params;
  const changes = req.body;
  connection.editListing(listingId, changes, (err, updated) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(201).send(updated);
    }
  });
});

app.delete('/api/rooms/:listingId/', (req, res) => {
  const { listingId } = req.params;
  connection.deleteListing(listingId, (err) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
