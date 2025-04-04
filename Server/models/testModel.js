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
    default: 0,
  },
  difficulty: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Server will set this automatically
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("test", testSchema);
