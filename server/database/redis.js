const redis = require('redis');
const { redisConf } = require('../config');
const { promisify } = require('util')
const client = redis.createClient(redisConf.port, redisConf.host, redisConf.options);

//设置过期时间
const expireAsync = promisify(client.expire).bind(client);
//string
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
//哈希表
const hgetallAsync = promisify(client.hgetall).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);

//链表
const rpushAsync = promisify(client.rpush).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);
// 监听redis状态
client.on('ready', () => {
    console.log('redis ready');
});
client.on('connect', () => {
    console.log('redis connect success')
});
client.on('error', err => {
    console.log(err)
});
client.on('end', () => {
    console.log('redis end')
})

module.exports = { client, hmsetAsync, hgetallAsync, expireAsync, rpushAsync, lrangeAsync, setAsync, getAsync };
