const express = require('express');
const app = express();

let books = [];
let authors = [];

app.post('/api/v1/author', (req, res) => {
  res.status(200);
  const q = req.query;
  if(q.action) {
    const action = q.action;
    if (action == 'create') {
      if (q.value) {
        authors.push(q.value);
        return res.send('done');
      }
    } else if (action == 'read') {
      if (q.id) 
        return res.send(authors[q.id]);
      return res.send(authors);
    } else if (action == 'update') {
      if (q.id) {
        if (authors[q.id] && q.value) {
          authors[q.id] = q.value;
          return res.send('done');
        }
      }
    } else if (action == 'delete') {
      if (q.id) {
        if (q.object == 'author') {
          if (authors[q.id]) {
            authors.splice(q.id, 1);
            return res.send('done');
          }
        }
      }
    }
  }
  res.send('error');
});

app.post('/api/v1/books', (req, res) => {
  res.status(200);
  const q = req.query;
  if(q.action) {
    const action = q.action;
    if (action == 'create') {
      if (q.value) {
        books.push(q.value);
        return res.send('done');
      }
    } else if (action == 'read') {
      if (q.id) 
        return res.send(books[q.id]);
      return res.send(books);
    } else if (action == 'update') {
      if (q.id) {
        if (books[q.id] && q.value) {
          books[q.id] = q.value;
          return res.send('done');
        }
      }
    } else if (action == 'delete') {
      if (q.id) {
        if (q.object == 'author') {
          if (books[q.id]) {
            books.splice(q.id, 1);
            return res.send('done');
          }
        }
      }
    }
  }
  res.send('error');
});

const port = 4002;
app.listen(4002, (err, done) => {
  if (err) console.error(err);
  else console.log(`listening on ${port}`);
});