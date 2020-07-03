function simple(req, res, next) {
  console.log(req.headers);
  if (!req.headers.authorization)
    return res.sendStatus(401);
  if (req.headers.authorization !== '12345678')
    return res.sendStatus(403);
  next()
};

// load keys
const keys = require('../keys.js');
function better(req, res, next) {
  if (!req.headers.authorization)
    return res.sendStatus(401);
  if (!keys.includes(req.headers.authorization))
    return res.sendStatus(403);
  next()
}

module.exports = better;