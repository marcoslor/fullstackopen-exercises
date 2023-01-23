const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: String,
  born: Number
});

authorSchema.virtual(
  "books",
  {
    ref: "Book",
    localField: "_id",
    foreignField: "author",
    justOne: false,
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
      },
    },
  }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;