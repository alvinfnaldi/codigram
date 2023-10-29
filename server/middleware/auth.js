const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ message: "Not authorized" });
    } else {
      const verify = jwt.verify(token, process.env.SECRET_KEY);
      if (verify) {
        next();
      } else {
        localStorage.removeItem("token")
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { checkToken };
