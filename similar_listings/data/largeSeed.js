const fs = require('fs');
const path = require('path');
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const _ = require('underscore');

const filePath = path.resolve(__dirname, 'data.json');

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

const similarListings = (num) => {
  const output = [];
  for (let i = 0; i < num; i += 1) {
    output.push(_.random(1, 10000000));
  }
  return output;
};

const generateRecord = (idx) => {
  const oneListing = {
    id: idx,
    images: choosePhotoBin(),
    type: 'ENTIRE HOME',
    beds: `${_.random(2, 4)} BEDS`,
    title: `${hipIp(2)} in ${fake.address.county()}`,
    price: _.random(39, 249),
    ratings: _.random(40, 270),
    average_rating: _.random(3, 5),
    similar: similarListings(12),
  };
  return JSON.stringify(oneListing);
};

const seedData = fs.createWriteStream(filePath);
let record = 1;

const write = () => {
  const startTime = Date.now();
  let ok = true;
  while (record < 10000001 && ok) {
    ok = seedData.write(generateRecord(record));
    console.clear();
    console.log(`${record} records written`);
    record += 1;
  }
  if (record < 10000001) {
    seedData.once('drain', write);
  } else {
    seedData.end();
    const endTime = Date.now();
    console.log(`${record - 1} records written to file in ${endTime - startTime}ms`);
  }
};
write();
