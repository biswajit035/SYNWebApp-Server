const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
// const pagesRoute = require("./pages.route");
const apiRoute = require("./api.route");
// const uploadRouter = require('./upload.route');

// router.get("/", (req, res) => {
//   res.render("home");
// });



router.use("/auth", authRoute);
// router.use("/pages", pagesRoute);
router.use("/api", apiRoute);
// router.use('/upload', uploadRouter);


module.exports = router;
