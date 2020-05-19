const cloudinary = require("cloudinary");
const Book = require('../models/book.model.js');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = async (req, res) => {
  res.render('books/index', {
    books: await Book.find()
  });
}

module.exports.admin = async (req, res) => {
  res.render('books/admin', {
    books: await Book.find()
  });
};

module.exports.create = (req, res) => {
  res.render('books/create');
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if(!book) {
      res.send('<script>alert("Id does not exits!");location.href="/books/admin"</script>');
    }else{
      res.render('books/update', {
        book: book
      });
    }
  });
  
};

module.exports.delete = (req, res) => {
  
  Book.findByIdAndRemove(req.params.id, (err, book) => {
    if(!book) {
      res.send('<script>alert("Id does not exits!");location.href="/books/admin"</script>');
    }else{
      res.redirect('/books/admin');
    }
  });
  
};

module.exports.postCreate = (req, res) => {
  
  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    if(error){
      res.render('books/create', {
        errors: ["Failed to update cover image!"]
      });
      return;
    }
    req.body.coverUrl = result.url;
    Book.create(req.body)
  });
    res.redirect("/books/admin");
};

module.exports.postUpdate = (req, res) => {
  cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
    if(error){
      res.render('books/update', {
        errors: ["Failed to update cover image!"]
      });
      return;
    }
    req.body.coverUrl = result.url;
    Book.findByIdAndUpdate(req.body.id, req.body).exec();
  });
  res.redirect('/books/admin');
};