const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("Register page1");
});

router.post("/addtest", async (req, res) => {
  const test = await testModel.create({
    title: req.body.title,
    difficulty: req.body.difficulty,
    userid: req.body.userid,
  });
  res.send(test);
});

router.post("/updateScore/:id", async (req, res) => {
  try {
    const test = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: {
          points: req.body.points,
          testAttended: 1,
        },
      },
      { new: true }
    );
    if (!test) {
      return res.status(404).send("User not found");
    }
    res.send(test);
  } catch (error) {
    console.error("Error updating score:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/gettest/:id", async (req, res) => {
  const test = await testModel.findOne({ userid: req.params.id }).sort({
    createdAt: -1,
  });
  console.log(test);
  res.send(test);
});

module.exports = router;
