const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator');
const bp = require('body-parser');
app.use(bp.json());
app.get('/api/v1/login', [
  check('email', 'Empty email field').not().isEmpty(),
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Empty password field').not().isEmpty(),
  check('password', 'Password must be between 5-100 characters').isLength({ min: 5, max: 100 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.sendStatus(400);
  }
  res.sendStatus(204);
})

const port = 4001;
app.listen(port, () => {
  console.log(`listening to ${4001}`);
});

