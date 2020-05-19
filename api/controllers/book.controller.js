const Book = require('../../models/book.model');

module.exports.index = async (req, res) => {
  let books = await Book.find();
  
  res.json(books);
}