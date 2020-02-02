const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Minimum password length is 6 symbols").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data"
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This email is already used" });
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashedPass
      });

      await newUser.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Auth error, try again" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Insert correct email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Minimum password length is 6 symbols").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid log in data"
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      // default response status is 200
      res.json({ token, userId: user.id, message: 'Logged in successfully' });
    } catch (e) {
      res.status(500).json({ message: "auth error, try again" });
    }
  }
);

module.exports = router;
