const redis = require('redis');

const client = redis.createClient({
  host: '172.31.37.211',
  port: '6379',
});

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

module.exports = { client };
