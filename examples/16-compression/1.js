const express = require('express')
const app = express();

const path = require('path');

app.get('/uncompressed', (req, res) => {
  res.sendFile(path.join(__dirname, '../15-asyncvsparallelism/big.json'));
});

const compression = require('compression');
app.use(compression());

app.get('/compressed', (req, res) => {
  res.sendFile(path.join(__dirname, '../15-asyncvsparallelism/big.json'));
});

const port = 4001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


