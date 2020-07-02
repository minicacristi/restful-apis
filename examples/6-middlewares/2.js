const express = require('express');
const app = express();

const links = [
  {
    href: '/api/v1/authors',
    type: 'GET',
    comment: 'authors collection, we expect a name in body and age in query'
  }
];

const bp = require('body-parser');
app.use(bp.json());

app.get('/api/v1/author', [
  (req, res, next) => {
    if (!req.query.age) {
      return res.status(400).json({
        error: 'We expect an age in query',
        links
      });
    }
    const age = req.query.age;
    // check the type
    if (isNaN(new Number(age))) {
      return res.status(400).json({
        error: 'We expect an age that is a number',
        links
      });
    }
    next();
  }, (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        error: 'We expect a name in body',
        links
      });
    }
    next();
  }], (req, res) => {
    res.json({
      name: req.body.name,
      age: req.query.age,
      links
    });
  });

const port = 4001;
app.listen(port, () => {
  console.log(`listening to ${port}`);
});

