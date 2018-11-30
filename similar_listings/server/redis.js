const redis = require('redis');

const client = redis.createClient({
  host: '54.197.11.32',
  port: '6379',
});

module.exports = { client };
