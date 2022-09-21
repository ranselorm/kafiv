const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstname: String,
  lastname: String,
  email: String,
  occupation: String,
  contact: String,
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
