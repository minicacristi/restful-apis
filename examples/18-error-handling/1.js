const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  if (req.query.err) {
    if (req.query.err == 'all') {
      throw {
        status: 405,
        message: 'Not yet allowed'
      };
    }

    // empty error object
    throw new Error(); // similar to {}
  }

  res.send('Hello');
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use(module.exports = function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error!'
  });
});

const port = 4001;
app.listen(port)
