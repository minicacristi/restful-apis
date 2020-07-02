module.exports = function (req, res, next) {
  console.log(req.headers);
  if (!req.headers.authorization)
    return res.sendStatus(401);
  if (req.headers.authorization !== '12345678')
    return res.sendStatus(403);
  next()
};