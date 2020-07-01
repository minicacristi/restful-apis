const express = require('express');
const router = express.Router()
let authors = [];

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
    comment: 'authors listing'
  },  {
    href: '/api/v1/authors',
    type : 'DELETE',
    comment: 'authors listing'
  }
];

router.get('/', (req, res) => {
  res.json({
    payload: authors,
    links
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (authors[id]) 
    res.json({
      payload: authors[id],
      links
    });
  else 
    res.send(404).json({
      links
    });
});

router.post('/authors', (req, res) => {
  if (!req.query.value)
    res.status(400).json({
      links
    });
  else {
    authors.push(req.query.value);
    res.status(201).json({
      payload: req.query.value,
      links
    });
  }
});

router.put('/:id', (req, res) => {
  if (!req.query.value) {
    res.status(400).json({
      links
    });
  } else if (!authors[req.params.id]) {
    res.status(404).json({
      links
    });
  } else {
    authors.push(req.query.value);
    res.json({
      payload: req.query.value,
      links
    });
  }
});
  
router.delete('/:id', (req, res) => {
  if (!req.query.value) {
    res.status(400).json({
      links
    });
  } else if (!authors[req.params.id]) {
    res.status(404).json({
      links
    });
  } else {
    authors.push(req.query.value);
    res.json({
      payload: req.query.value,
      links
    });
  }
});

router.use('/', () => {
  res.status(405).json({
    links
  });
});

module.exports = router;