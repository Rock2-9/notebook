const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Mynameisdeepak";
const fetchUser = require("../middleware/fetchUser");
//Route:1
router.post(
  "/createUser",
  [
    body("name", "Enter a Valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid email").isEmail(),
    body("password", "Password must be of 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    res.json({ authToken });

    // .then((user) => {
    //   res.json(user);
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.json({
    //     error: "please Enter a unique value of email",
    //     message: err.message,
    //   });
    // });
  }
);

//Route:2
router.post(
  "/login",
  [
    body("email", "Enter a Valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Plese try to login with correct email" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Please Enter correct password" });
      }
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(password, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Internal server Error");
    }
  }
);

//Route:3
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    res.status(400).send("Internal Server Error");
  }
});
module.exports = router;
