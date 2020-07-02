const express = require('express');
const app = express();


const morgan = require('morgan');
const fs = require('fs');
app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', {
    flags: 'a'
  })
}));

app.use((req, res) => {
  res.send('Hello');
});

const port = 4001;
app.listen(port, () => {
  console.log(`started listening on ${4001}`);
});