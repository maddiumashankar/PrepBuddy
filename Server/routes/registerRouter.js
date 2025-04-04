const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  res.send("Register page1");
});

router.get("/user", (req, res) => {
  res.send("Register page2");
});

router.post("/", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }
  const user2 = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    profilepic: req.body.profilepic,
  });
  console.log(user2);
  res.send(req.body);
});

router.get("/getuser/:email", async (req, res) => {
  let user = await userModel.findOne({ email: req.params.email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  res.send(user);
});

router.get("/getuser2/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(400).send("User not found");
  }
  res.send(user);
});

module.exports = router;
