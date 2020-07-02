const express = require('express');
const app = express();

let map = {};

const refreshInterval = setInterval( () => {
  map = {};
}, 15 * 60 * 1000);

const MAX = 10;
app.use((req, res, next) => {
  map[req.ip] = map[req.ip] ? map[req.ip] + 1 : 1;

  if (map[req.ip] >= MAX)
    return res.sendStatus(429);
  next();
});

app.use((req, res) => {
  res.send('Hello');
});

const port = 4001;
app.listen(port, () => {
  console.log(`started listening on ${port}`);
});