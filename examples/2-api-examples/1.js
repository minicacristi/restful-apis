const express = require('express');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Hello world express!');
});

const port = 3002;
app.listen(port, () => {
    console.log('listening on port 3002');
});
