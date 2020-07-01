const express = require('express');
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb',{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true}
});

let authorsModel = mongoose.model('Authors', authorSchema);

const links = [
  {
    href: '/api/v1/authors',
    type : 'GET',
    comment: 'authors collection'  
  },  {
    href: '/api/v1/authors/:id',
    type : 'GET',
    comment: 'author singleton by id'
  },  {
    href: '/api/v1/authors',
    type : 'POST',
    comment: 'create an author'
  },  {
    href: '/api/v1/authors',
    type : 'PUT',
    comment: 'authors edit'
  },  {
    href: '/api/v1/authors',
    type : 'DELETE',
    comment: 'authors delete'
  }
];

app.get('/api/v1/authors', async (req, res) => {
  const options = { }
  const name = req.query.name;
  if (name) {
    options.name = name;
  }
  const authors = await authorsModel.find(options);
  res.json({
    payload: authors,
    links
  });
});

app.get('/api/v1/authors/:id', async (req, res) => {
  const _id = req.params.id;
  const author = await authorsModel.findOne({
    _id
  });
  console.log(author)
  if (author) 
    res.json({
      payload: author,
      links
    });
  else 
    res.send(404).json({
      links
    });
});

app.post('/api/v1/authors', async (req, res) => {
  try {
    if (!req.query.value)
      res.status(400).json({
        links
      });
    else {
      let author = new authorsModel({
        name: req.query.value
      });
      await author.save();
      res.status(201).json({
        payload: author,
        links
      });
    } 
  } catch(err) {
    console.error(err.message)
    res.status(500).json({
      error: err.message,
      links
    });
  }
});

app.put('/api/v1/authors/:id', async (req, res) => {
  try {
    if (!req.query.value) {
      res.status(400).json({
        links
      });
    } else {
      const id = req.params.id;
      const author = await authorsModel.findOne({_id: id});
      
      if (!author) {
        return res.status(404).json({
          links
        });
      }

      author.name = req.query.value;

      await author.save();

      res.json({
        payload: author,
        links
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      links
    });
  }
});
  
app.delete('/api/v1/authors/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const author = await authorsModel.findOne({ _id });
    if (!author) {
      return res.status(404).json({
        links
      })
    }
    await authorsModel.deleteOne({ _id });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      links
    });
  }
});

app.use('/api/v1/authors', (req, res) => {
  res.status(405).json({
    links
  });
});

const port = 4004;
app.listen(port, (err, done) => {
  if (err) console.error(err);
  else console.log(`listening on ${port}`);
});