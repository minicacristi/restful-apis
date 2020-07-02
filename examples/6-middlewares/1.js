const express = require('express');
const app = express();

const links = [
  {
    href: '/api/v1/authors',
    type : 'GET',
    comment: 'authors collection, we expect a name in query'  
  }
]

app.get('/api/v1/author', 
(req, res, next) => {
  if(!req.query.name) {
    return res.status(400).json({
      error: 'We expect a name search parameter.',
      links
    });
  }
  next();
}, (req, res) => {
  res.json({
    name: req.query.name,
    links
  });
});

const port = 4001;
app.listen(port, () => {
  console.log(`listening to ${4001}`);
});

