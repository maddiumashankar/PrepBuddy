const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PrepBuddy");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('user',userSchema)