const express = require('express');
const app = express();

let authors = [];

app.get('/api/v1/authors', (req, res) => {
  res.send(authors);
});

app.get('/api/v1/authors/:id', (req, res) => {
  const id = req.params.id;
  if (authors[id]) 
    res.send(authors[id]);
  else 
    res.sendStatus(404);
});

app.post('/api/v1/authors', (req, res) => {
  if (!req.query.value)
    res.sendStatus(400);
  else {
    authors.push(req.query.value);
    res.status(201).send(req.query.value);
  }
});

app.put('/api/v1/authors/:id', (req, res) => {
  if (!req.query.value) {
    res.sendStatus(400);
  } else if (!authors[req.params.id]) {
    res.sendStatus(404)
  } else {
    authors.push(req.query.value);
    res.send(req.query.value);
  }
});
  
app.delete('/api/v1/authors/:id', (req, res) => {
  if (!req.query.value) {
    res.sendStatus(400);
  } else if (!authors[req.params.id]) {
    res.sendStatus(404)
  } else {
    authors.push(req.query.value);
    res.send(req.query.value);
  }
});

const port = 4004;
app.listen(port, (err, done) => {
  if (err) console.error(err);
  else console.log(`listening on ${port}`);
});