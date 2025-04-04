const express = require("express");
const router = express.Router();
const testModel = require("../models/testModel");

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

router.get("/gettest/:id", async (req, res) => {
  const test = await testModel.findOne({ userid: req.params.id }).sort({
    createdAt: -1,
  });
  console.log(test);
  res.send(test);
});

module.exports = router;
