const express = require('express');
const app = express();

const erl = require('express-rate-limit');
const erli = erl({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 9 // limit each IP to 9 requests per windowMs
});
app.use(erli);

app.use((req, res) => {
  res.send('Hello');
});

const port = 4001;
app.listen(port, () => {
  console.log(`started listening on ${4001}`);
});