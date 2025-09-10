// models/BookRequest.js
const mongoose = require("mongoose");

const bookRequestSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BookRequest", bookRequestSchema);
