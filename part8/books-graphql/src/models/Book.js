const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    published: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    genres: [String],
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
      },
    },
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;