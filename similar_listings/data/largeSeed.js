const fs = require('fs');
const path = require('path');
const fake = require('faker');
const HipsterIpsum = require('hipsteripsum');
const _ = require('underscore');

const filePath = path.resolve(__dirname, 'seed.csv');
const file = fs.createWriteStream(filePath);

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
  let csvRows = '';

  for (let i = 1; i <= 50000; i += 1) {
    csvRows += startId + i;
    csvRows += ',';
    csvRows += `[${choosePhotoBin()}]`;
    csvRows += ',';
    csvRows += 'ENTIRE HOME';
    csvRows += ',';
    csvRows += `${_.random(2, 4)} BEDS`;
    csvRows += ',';
    csvRows += `${hipIp(2)} in ${fake.address.county()}`;
    csvRows += ',';
    csvRows += _.random(39, 249);
    csvRows += ',';
    csvRows += _.random(40, 270);
    csvRows += ',';
    csvRows += _.random(3, 5);
    csvRows += '\n';
  }
  return csvRows;
};

const startTime = Date.now();

for (let i = 0; i < 10; i += 1) {
  fs.writeFileSync(filePath, generateChunk(i * 50000), { flag: 'a' });
  console.log(`Chunk #${i + 1} written`);
}
const endTime = Date.now();
console.log(`Files written in ${endTime - startTime}ms`);
