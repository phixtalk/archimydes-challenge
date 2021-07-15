const mongoose = require("mongoose");
require("dotenv").config();

//Connect to DB
const connectDB = () => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log("connected to db")
  );
};

const closeConnect = () => {
  mongoose.disconnect();
};

module.exports = {
  connectDB,
  closeConnect,
};
