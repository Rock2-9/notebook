const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mynameisdeepak";

const fetchUser = (req, res, next) => {
  const Token = req.header("auth-token");
  if (!Token) {
    res.status(400).send({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(Token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).send({ error: "Please authenticate using valid token" });
  }
  const data = jwt.verify(Token, JWT_SECRET);
  req.user = data.user;
};

module.exports = fetchUser;
