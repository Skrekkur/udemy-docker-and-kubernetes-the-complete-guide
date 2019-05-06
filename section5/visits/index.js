const express = require('express');
const redis = require('redis');
const process = require('process')

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

client.get('visits', (err, visits) => {

  console.log(err);
  console.log(visits);
  if (visits === null)
    client.set("visits", 0);
});

app.get('/', (req, res) => {

  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
 

});

app.listen(8082, () => {
  console.log('Listening on port 8081');
});
