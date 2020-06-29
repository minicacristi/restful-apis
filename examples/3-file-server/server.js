const express = require('express');
const app = express();

// using morgan logger middleware to see the served files.
const morgan = require('morgan');
app.use(morgan('dev'));

// serves files from node_modules.
const path = require('path');
app.use(express.static(path.join(__dirname, '../../node_modules'), {
  maxAge: 24 * 60 * 60 * 1000
}));

const port = 3010;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
