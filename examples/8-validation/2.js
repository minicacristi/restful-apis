const express = require('express');
const app = express();

app.get('/api/v1/author', (req, res) => {
  res.json({
    name: req.query.name,
    links
  });
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status).json({
    error: err.message || 'Internal Server error!'
  });
});

const port = 4001;
app.listen(port, () => {
  console.log(`listening to ${4001}`);
});

