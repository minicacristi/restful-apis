const express = require('express');
const bp = require('body-parser');
const app = express();

let tutorials = [];

app.use(bp.json());

app.get('/tutorials', (req, res) => {
  res.send(tutorials);
});

app.get('/tutorials/:id', (req, res) => {
  const id = req.params.id;
  if (tutorials[id]) {
    res.send(tutorials[id]);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/tutorials', (req, res) => {
  res.sendStatus(405);
});

app.delete('/tutorials/:id', (req, res) => {
  const id = req.params.id;
  if (tutorials[id]) {
    // happy path
    tutorials.splice(id, 1);
    res.sendStatus(204);
  } else { 
    // sad path
    res.sendStatus(404);
  }
});

app.post('/tutorials', (req, res) => {
  const tutorial = {
    author: req.body.author,
    title: req.body.title
  };
  tutorials.push(tutorial);
  res.status(201).json(tutorial);
});

const port = 3004;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
