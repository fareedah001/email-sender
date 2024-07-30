// model.js

const mongoose = require("mongoose");

const usersModel = {
  // name: String,
  // email: String,
  // role: String,
  // text: String,
  // date: { type: Date, default: Date.now },
  from: String,
  to: String,
  subject: String,
  text: String,
};
const schema = new mongoose.Schema(usersModel);

const userSchema = mongoose.model("users", schema);

module.exports = userSchema;
