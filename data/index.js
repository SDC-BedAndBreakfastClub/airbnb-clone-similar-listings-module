
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.connect('mongodb://localhost:27017/listing', (err) => {
  if (err) throw err;
});

const listingSchema = new mongoose.Schema({
  id: Number,
  images: [String],
  saved: Boolean,
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

for (let i = 1; i < 101; i += 1) {
  const oneListing = {
    id: i,
    images: ['1', '2', '3', '4', '5'],
    saved: 0,
    type: 'ENTIRE HOME',
    beds: `${_.random(2, 4)} BEDS`,
    title: `${hipIp(2)} in ${fake.address.county()}`,
    price: _.random(39, 249),
    ratings: _.random(40, 270),
    average_rating: _.random(4, 5),
  };
  allListings.push(oneListing);
}

Listing.create(allListings, (err) => {
  if (err) throw err;
  mongoose.connection.close();
});
