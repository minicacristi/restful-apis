const express = require('express');
const app = express();

const apiKey = require('./middlewares/apiKey');
app.use(apiKey);

app.use('/api/v1/authors', (req, res) => {
  const authors = [{
    name: 'Aristotel'
  }, {
    name: 'Marcu Aurelius'
  }];

  res.json(authors);
});

const port = 4001;
app.listen(4001, (err, done) => {
  if (err) console.error(err);
  else console.log(`listening on ${port}`);
});