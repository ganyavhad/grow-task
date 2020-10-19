const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: Number
  }
});
module.exports = mongoose.model("User", schema);

