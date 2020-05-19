module.exports.postCreate = (req, res, next) => {
  let errors = [];
  
  if(!req.body.title){
    errors.push('Title book is required!');
  }
  if(!req.body.description){
    errors.push('Description is required!');
  }
  if(!req.file){
    errors.push('Please select a file!');
  }
  if(errors.length){
    res.render('books/create',{
      errors: errors,
      values: req.body
    });
    return;
  }
  next();
}

module.exports.postUpdate = (req, res, next) => {
  let errors = [];
  
  if(!req.body.title){
    errors.push('Title book is required!');
  }
  if(!req.body.description){
    errors.push('Description is required!');
  }
  if(!req.file){
    errors.push('Please select a file!');
  }
  if(errors.length){
    res.render('books/update',{
      errors: errors,
      book: req.body
    });
    return;
  }
  next();
};