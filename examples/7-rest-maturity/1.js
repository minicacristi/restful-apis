const express = require('express');
const app = express();

let books = [];
let authors = [];

app.post('/api/v1/', (req, res) => {
  res.status(200);
  const q = req.query;
  if (q.action) {
    const action = q.action;
    if (action == 'create') {
      if (q.object) {
        if (q.object == 'author') {
          if (q.value) {
            authors.push(q.value);
            return res.send('done');
          }
        }
        if (q.object == 'book') {
          if (q.value) {
            books.push(q.value);
            return res.send('done');
          }
        }
      }
    } else if (action == 'read') {
      if (q.object == 'author') {
        if (q.id) return res.send(authors[q.id]);
        return res.send(authors);
      }
      if (q.object == 'book') {
        if (q.id) return res.send(books[q.id]);
        return res.send(books);
      }
    } else if (action == 'update') {
      if (q.id) {
        if (q.object) {
          if (q.object == 'author') {
            if (authors[q.id] && q.value) {
              authors[q.id] = q.value;
              return res.send('done');
            }
          }
          if (q.object == 'book') {
            if (books[q.id] && q.value) {
              books[q.id] = q.value;
              return res.send('done');
            }
          }
        }
      }
    } else if (action == 'delete') {
      if (q.id) {
        if (q.object) {
          if (q.object == 'author') {
            if (authors[q.id]) {
              authors.splice(q.id, 1);
              return res.send('done');
            }
          }
          if (q.object == 'book') {
            if (books[q.id]) {
              books.splice(q.id, 1);
              return res.send('done');
            }
          }
        }
      }
    }
  }
  res.send('error');
});

const port = 4001;
app.listen(4001, (err, done) => {
  if (err) console.error(err);
  else console.log(`listening on ${port}`);
});