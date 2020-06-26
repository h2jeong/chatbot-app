const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const cors = require("cors");

const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/users", require("./routes/users"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
