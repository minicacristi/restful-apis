const express = require('express');

const app = express();
app.use((req, res, next) => {
  console.log(`${req.ip}-${req.host}-${req.method}-${req.originalUrl}`);
  next();
});

const morgan = require('morgan');
app.use(morgan('combined'));

app.use((req, res) => {
  res.send('Hello');
});

const port = 4001;
app.listen(port, () => {
  console.log(`started listening on ${port}`);
});