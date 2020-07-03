const express = require('express');
const app = express();

// using morgan logger middleware to see the served files.
const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');
const DAY = 24 * 60 * 60 * 1000
// by default it uses the entity tag header
// etag implies an exchange between the server and the client 
// client is asking if the etag has changed
// if the etag is the same the server will respond with 304
// etag is a response header
app.use(express.static(path.join(__dirname, '../../node_modules')));


// max age implies that the client should cache the resource for
// the specified time and, upon request, should return the 
// resource fromt the cache
// app.use(express.static(path.join(__dirname, '../../node_modules'), {
//  maxAge: DAY
// }));

const port = 3010;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
