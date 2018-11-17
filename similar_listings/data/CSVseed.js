const fs = require('fs');
const path = require('path');
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const _ = require('underscore');

const csvFile = path.resolve(__dirname, 'data.csv');

const hipIp = (numOfWords) => {
  let words = HipsterIpsum.get();
  words = words.split(' ').splice(0, numOfWords);
  return words.join(' ');
};

// =================CSV DATA GENERATION====================
// choosePhotoBinCSV and similarListingsCSV generate data in a
// format that postgresql will recognize as an array
// ie {data1, data2, ...} instead of using []
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

const generateChunkCSV = (startId) => {
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
  fs.writeFileSync(csvFile, generateChunkCSV(chunk * 10000), { flag: 'a' });
  console.log(`Chunk #${chunk + 1} written`);
}
const endTime = Date.now();
console.log(`${chunk * 10000} records written to file in ${endTime - startTime}ms`);
