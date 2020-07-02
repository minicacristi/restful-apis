const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.get('/3rdpartyapiproxy', async (req, res) => {
  const apiRes = await fetch('https://reqres.in/api/unknown');
  const body = await apiRes.json();
  res.json(body);
});

const port = 3002;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
