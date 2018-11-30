require('newrelic');
const cors = require('cors');
const express = require('express');
const path = require('path');
const { client } = require('./redis.js');
const connection = require('../data/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/rooms/:listingId', (req, res) => {
  const filePath = path.resolve(__dirname, '../public/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('index file sent');
    }
  });
});

app.get('/api/rooms/:listingId/similar_listings', (req, res) => {
  const { listingId } = req.params;

  // check for query result in cache
  return client.get(listingId, (err, reply) => {
    console.log(`Checking Cache for ${listingId}`);
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (reply !== 'null') { // if the information is cached, send it
      console.log(reply);
      return res.status(200).send(reply);
    }
    // if query response is not in cache, query the database
    return connection.get12(listingId, (err, results) => {
      console.log('Not in cache, querying database');
      if (err) {
        console.log(err);
        return res.status(500).end();
      }
      // add the query result to cache
      client.set(listingId, JSON.stringify(results));
      // send query result
      return res.status(200).send(results);
    });
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

app.patch('/api/rooms/:listingId/similar_listings', (req, res) => {
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

app.get('/loaderio-1e2ef16adcc8d36dd3ce8865d87e3561/', (req, res) => {
  const filePath = path.resolve(__dirname, '../loader.txt');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('loader verification sent');
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
