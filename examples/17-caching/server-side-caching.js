const express = require('express');
const fetch = require('node-fetch');

const app = express();
const cache = { }
app.get('/3rdpartyapiproxy', async (req, res) => {
  let body = {};
  const apiCache = cache['3rdpartyapiproxy'];
  let now = new Date().getTime();
  const HOUR = 60 * 60 * 1000;
  // query the cache
  if (apiCache && (now - apiCache.time < HOUR)) {
    body = apiCache.data;
  } else {
    // make the request
    const apiRes = await fetch('https://reqres.in/api/unknown');
    body = await apiRes.json();
    // cache the request
    cache['3rdpartyapiproxy'] = {
      time: now,
      data: body
    };
  }
  res.json(body);
});

const port = 3002;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
