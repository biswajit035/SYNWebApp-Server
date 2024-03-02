const express = require("express");
// const getUser = require("./middleware/getUser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const routes = require("./routes/index");
const cors = require("cors");
const { PORT, MONGO_URI} = require("./config");

const app = express();

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ encoding: false }));
app.use(express.static('public'));
app.use(bodyParser.json());


app.use(routes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} in dev mode`);
});
