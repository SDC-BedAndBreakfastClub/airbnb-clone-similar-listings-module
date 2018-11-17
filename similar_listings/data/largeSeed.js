const fs = require('fs');
const path = require('path');
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const _ = require('underscore');

// const jsonFile = path.resolve(__dirname, 'data.json');
const csvFile = path.resolve(__dirname, 'data.csv');

const hipIp = (numOfWords) => {
  let words = HipsterIpsum.get();
  words = words.split(' ').splice(0, numOfWords);
  return words.join(' ');
};

const choosePhotoBinCSV = () => {
  const bin = _.random(1, 13);
  let photoLinks = '{';
  for (let i = 1; i < 6; i += 1) {
    photoLinks += `"https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_${bin}_img${i}.jpg",`;
  }
  return `${photoLinks.slice(0, photoLinks.length - 1)}}`;
};

const similarListingsCSV = (num) => {
  let output = '{';
  for (let i = 0; i < num; i += 1) {
    output += `${_.random(1, 10000000)},`;
  }
  return `${output.slice(0, output.length - 1)}}`;
};

const generateChunk = (startId) => {
  let csvRows = '';

  for (let i = 1; i <= 10000; i += 1) {
    csvRows += `"${startId + i}"`;
    csvRows += ',';
    csvRows += `"${choosePhotoBinCSV()}"`;
    csvRows += ',';
    csvRows += '"ENTIRE HOME"';
    csvRows += ',';
    csvRows += `"${_.random(2, 4)} BEDS"`;
    csvRows += ',';
    csvRows += `"${hipIp(2)} in ${fake.address.county()}"`;
    csvRows += ',';
    csvRows += `"${_.random(39, 249)}"`;
    csvRows += ',';
    csvRows += `"${_.random(40, 270)}"`;
    csvRows += ',';
    csvRows += `"${_.random(3, 5)}"`;
    csvRows += ',';
    csvRows += `"${similarListingsCSV(12)}"`;
    csvRows += '\n';
  }
  return csvRows;
};

const startTime = Date.now();
let chunk = 0;
for (chunk; chunk < 1000; chunk += 1) {
  fs.writeFileSync(csvFile, generateChunk(chunk * 10000), { flag: 'a' });
  console.log(`Chunk #${chunk + 1} written`);
}
const endTime = Date.now();
console.log(`${chunk * 10000} records written to file in ${endTime - startTime}ms`);

// =====================JSON DATA GENERATION===============
// const choosePhotoBin = () => {
//   const bin = _.random(1, 13);
//   const photoLinks = [];
//   for (let i = 1; i < 6; i += 1) {
//     photoLinks.push(`https://s3-us-west-1.amazonaws.com/airbnb-clone-images/id_${bin}_img${i}.jpg`);
//   }
//   return photoLinks;
// };

// const similarListings = (num) => {
//   const output = [];
//   for (let i = 0; i < num; i += 1) {
//     output.push(_.random(1, 10000000));
//   }
//   return output;
// };
// const generateRecord = (idx) => {
//   const oneListing = {
//     id: idx,
//     images: choosePhotoBin(),
//     type: 'ENTIRE HOME',
//     beds: `${_.random(2, 4)} BEDS`,
//     title: `${hipIp(2)} in ${fake.address.county()}`,
//     price: _.random(39, 249),
//     ratings: _.random(40, 270),
//     average_rating: _.random(3, 5),
//     similars: similarListings(12),
//   };
//   return JSON.stringify(oneListing);
// };

// const seedData = fs.createWriteStream(jsonFile);
// let record = 1;

// const write = () => {
//   const startTime = Date.now();
//   let ok = true;
//   while (record < 10000001 && ok) {
//     ok = seedData.write(generateRecord(record));
//     console.clear();
//     console.log(`${record} records written`);
//     record += 1;
//   }
//   if (record < 10000001) {
//     seedData.once('drain', write);
//   } else {
//     seedData.end();
//     const endTime = Date.now();
//     console.log(`${record - 1} records written to file in ${endTime - startTime}ms`);
//   }
// }

// write();
