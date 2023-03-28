const redis = require('redis');
const { promisify } = require('util');

let client = redis.createClient({
    port: process.env.KB_REDIS_PORT || 6379,
    host: process.env.KB_REDIS_IP || 'localhost',
    password: process.env.KB_REDIS_PW
});

['get', 'set', 'keys'].forEach(
    k => {
        client[`${k}Async`] = promisify(client[k]);
    }
);

module.exports = client;
