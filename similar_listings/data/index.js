const { Pool } = require('pg');

const pool = new Pool();

const get12 = (listingId, cb) => {
  const querySimilars = 'SELECT similars FROM listings WHERE id = $1';
  pool.query(querySimilars, [listingId])
    .then((list) => {
      const similarList = list.rows[0].similars;
      const queryListings = 'SELECT * FROM listings WHERE id = ANY ($1)';
      pool.query(queryListings, [similarList])
        .then((listings) => {
          cb(null, listings.rows);
        })
        .catch(e => cb(e.stack));
    })
    .catch(e => cb(e.stack));
};

module.exports.connection = pool;
module.exports = { get12 };
