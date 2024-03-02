const express = require("express");
const { authcheak } = require("../middleware/authcheck");
const User = require("../mongoSchema/userSchema");
const router = express.Router();

router.put("/user/edit", authcheak, async (req, res) => {
  try {
    await User.findByIdAndUpdate({ _id: req.user }, req.body);
    return res.status(200).send({ msg: "Account Updated Successfullt" });
  } catch (err) {
    return res.status(200).send({ msg: err.message });
  }
});


router.get("/user", authcheak, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user }).select('-password').select('-token');
    return res.status(200).send({ code: "success", data: user });
  } catch (err) {
    return res.status(200).send({ msg: err.message });
  }
});





module.exports = router;
