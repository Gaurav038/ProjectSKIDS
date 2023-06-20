const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(express.json())
app.use(cors());

const dataRoute = require("./routes/data")

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"))
}

const connection = mongoose.connect(
    process.env.DB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port: 8000`);
    });
  })
  .catch((err) => {
    console.log(err);
  }
);

app.use('/data', dataRoute)


