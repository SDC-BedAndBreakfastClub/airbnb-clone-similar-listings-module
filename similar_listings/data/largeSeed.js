const Promise = require('bluebird');
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect('mongodb://localhost/listings', (err) => {
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

const chunks = [];

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

const generateChunk = (startId) => {
  const allListings = [];
  for (let i = 1; i <= 50000; i += 1) {
    const oneListing = {
      _id: startId + i,
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
  return allListings;
};

for (let i = 0; i < 200; i += 1) {
  chunks.push(Listing.insertMany(generateChunk(i * 50000), { ordered: false }, (error, docs) => {
    if (error) {
      throw error;
    } else {
      console.log(`${docs.length} documents written to database.`);
    }
  }));
}

Promise.all(chunks).then(() => {
  console.log(`Database Seeding Complete`);
});
