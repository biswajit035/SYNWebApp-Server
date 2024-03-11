const express = require("express");
const mongoose = require("mongoose");
// const { authcheak, authcheakForsignin } = require("../middleware/authcheak");
const User = require("../mongoSchema/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    // checking if user already exists
    const fUser = await User.findOne({ email: req.body.email })
    if (fUser) return res.json({ msg: "user already exist" });

    // hashing Password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    // creating and saving new user
    const new_user = new User(req.body);
    await new_user.save();

    return res.json({ msg: "user registered succesfully" });

  } catch (err) {
    return res.json({ msg: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      return res.status(200).json({
        msg: "Successful login",
        token: token,
      });
    }
    return res.json({ msg: "wrong credentials" });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    const password = Math.random()                        // Generate random number, eg: 0.123456
      .toString(36)           // Convert  to base-36 : "0.4fzyo82mvyr"
      .slice(-8)// Cut off last 8 characters : "yo82mvyr"
    const enPassword = await bcrypt.hashSync(
      password, 10);

    if (user) {
      user.password = enPassword;
      await user.save()
    }
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD
      },
    });

    const mail = {
      from: process.env.SENDER_EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      text: `Your new password is : ${password}"`

    }

    transporter.sendMail(mail).then(() => {

      return res.status(200).json({ message: 'Password is updated. Check your registered mail' })
    }
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Error' })

  }
})

router.get("/verification", async (req, res) => {

  const token = req.header('token');
  if (token == null) {
    return res.status(400).json({ error: "Unauthorized User" })
  } else {
    try {
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {

        if (err) {
          return res.status(401).json({ error: "Unauthorized User" })

        }
        else {
          return res.status(200).json({
            msg: "Token Verfication Successful"
          });
        }
      });
    } catch (error) {
      res.status(300).json({ error: "Unauthorized User" })
    }
  }
});

module.exports = router;
