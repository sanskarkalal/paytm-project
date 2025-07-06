const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sanskar:sanskar12@barberqueuecluster.8jc8mwe.mongodb.net/"
);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  userName: String,
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
