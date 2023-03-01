const jwt = require('jsonwebtoken');

const SECRET = 'secret';


exports.authenticate = function authenticate(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    } else {
      jwt.verify(token, SECRET, (err, data) => {
        if (data) {
          email = data.email;
          next();
        } else {
          res.status(400).json({ err });
        }
      });
    }
  }