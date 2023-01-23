const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3 },
    favouriteGenre: String,
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
