const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const apiRoute = require("./api");


router.use("/auth", authRoute);
// router.use("/pages", pagesRoute);
router.use("/api", apiRoute);
// router.use('/upload', uploadRouter);


module.exports = router;
