const jwt = require('jsonwebtoken');
const tokenVerify = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.send({ message: "Unauthorized access" });
  }

  const token = bearerToken.split(' ')[1];
  try {
    jwt.verify(token, process.env.SECRET_KEY );
    next();
  } catch (err) {
    return res.send({ message: "Token expired, please login again" });
  }
};

module.exports = tokenVerify;

