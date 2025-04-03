const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PrepBuddy");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  creditsUsed: {
    type: Number,
    default: 0,
  },
  maxCredits: {
    type: Number,
    default: 5,
  },
});

module.exports = mongoose.model("user", userSchema);
