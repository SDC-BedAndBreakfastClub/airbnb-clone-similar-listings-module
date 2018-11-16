
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect('mongodb://database/listing', (err) => {
  if (err) throw err;
});

const listingSchema = new mongoose.Schema({
  id: Number,
  images: [String],
  type: String,
  beds: String,
  title: String,
  price: Number,
  ratings: Number,
  average_rating: Number,
});

const Listing = mongoose.model('Listing', listingSchema);

const allListings = [];

const hipIp = (numOfWords) => {
  let words = HipsterIpsum.get();
  words = words.split(' ').splice(0, numOfWords);
  return words.join(' ');
};

const choosePhotoBin = () => {
  const bin = _.random(1, 13);
  const photoLinks = [];
  for (let i = 1; i < 6; i += 1) {
    photoLinks.push(`https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_${bin}_img${i}.jpg`);
  }
  return photoLinks;
};

for (let i = 1; i < 101; i += 1) {
  const oneListing = {
    id: i,
    images: choosePhotoBin(),
    saved: 0,
    type: 'ENTIRE HOME',
    beds: `${_.random(2, 4)} BEDS`,
    title: `${hipIp(2)} in ${fake.address.county()}`,
    price: _.random(39, 249),
    ratings: _.random(40, 270),
    average_rating: _.random(3, 5),
  };
  allListings.push(oneListing);
}

Listing.create(allListings, (err) => {
  if (err) throw err;
  // mongoose.connection.close();
});

const get12 = (cb) => {
  const twelveIDs = [];
  let twelveListings = [];
  for (let i = 0; i < 12; i += 1) {
    const randomN = _.random(1, 100);
    if (twelveIDs.includes(randomN)) {
      i -= 1;
    } else {
      twelveIDs.push(randomN);
    }
  }
  twelveListings = twelveIDs.map(id => new Promise((resolve, reject) => {
    Listing.findOne({ id }).exec((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }));
  Promise.all(twelveListings).then((values) => {
    cb(null, values);
  }).catch((reason) => {
    console.log(reason);
  });
};

const addListing = (newListing, cb) => {
  Listing.create(newListing, (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

const deleteListing = (listingId, cb) => {
  Listing.findOneAndDelete({ id: listingId }, (err) => {
    if (err) {
      cb(err);
    } else {
      cb(null);
    }
  });
};

const editListing = (listingId, changes, cb) => {
  Listing.findOneAndUpdate({ id: listingId }, changes, { new: true }, (err, doc) => {
    if (err) {
      cb(err);
    } else {
      cb(null, doc);
    }
  });
};

module.exports = { get12 };
module.exports = { deleteListing };
module.exports = { addListing };
module.exports = { editListing };
module.exports = { Listing };
