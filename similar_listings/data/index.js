const { Pool } = require('pg');

const pool = new Pool({
  max: 10,
});

const get12 = (listingId, cb) => {
  const querySimilars = 'SELECT similars FROM listings WHERE id = $1';
  pool.query(querySimilars, [listingId])
    .then((list) => {
      const similarList = list.rows[0].similars;
      const queryListings = 'SELECT * FROM listings WHERE id = ANY ($1)';
      pool.query(queryListings, [similarList])
        .then(listings => cb(null, listings.rows))
        .catch(e => cb(e.stack));
    })
    .catch(e => cb(e.stack));
};

const addListing = (newListing, cb) => {
  const queryAdd = 'INSERT INTO listings VALUES ($1)';
  const value = newListing;
  pool.query(queryAdd, [value])
    .catch(e => cb(e.stack));
};

const deleteListing = (listingId, cb) => {
  const queryDelete = 'DELETE FROM listings WHERE id = $1';
  const value = listingId;
  pool.query(queryDelete, [value])
    .catch(e => cb(e.stack));
};

const editListing = (listingId, changes, cb) => {
  const queryEdit = `UPDATE listings SET
    images = $2,
    type = $3,
    beds = $4,
    title = $5,
    price = $6,
    ratings = $7,
    average_ratings = $8,
    similars = $9
    WHERE id = $1
    RETURNING *`;
  const values = [listingId, changes];
  pool.query(queryEdit, values)
    .then(res => cb(null, res))
    .catch(e => cb(e.stack));
};

module.exports.get12 = get12;
module.exports.addListing = addListing;
module.exports.editListing = editListing;
module.exports.deleteListing = deleteListing;
