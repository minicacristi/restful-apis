const cors = require('cors');
const express = require('express');
const app = express();

// app.use(cors());

app.get('/api/', (req, res) => {
  res.send('test');
})

// put it here and you will issues with the GET
// app.use(cors());

app.post('/api/', (req, res) => {
  res.send('test');
})

module.exports = app;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started. Listening on port: ${port}.`);
});