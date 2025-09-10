const express = require("express");
const router = express.Router();
const BookRequest = require("../models/BookRequest");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { bookName, authorName } = req.body;
    const userId = req.headers.id;

    const user = await User.findById(userId);

    const newRequest = new BookRequest({
      bookName,
      authorName,
      userId,
      username: user.username,
      email: user.email
    });

    await newRequest.save();
    res.status(200).json({ msg: "Request submitted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await BookRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching requests", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await BookRequest.findByIdAndDelete(req.params.id);
    res.json({ msg: "Request deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting request", error: err });
  }
});

module.exports = router;
