const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PrepBuddy");

const testSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("test", testSchema);
