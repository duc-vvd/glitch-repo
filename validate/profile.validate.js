const db = require('../db');

module.exports.postIndex = (req, res, next) => {
  let errors = [];
  
  if(!req.body.name){
    errors.push('Name is required!');
  }
  if(req.body.name.length > 30){
    errors.push('Name can be up to 30 characters long!');
  }
  if(!req.body.email){
    errors.push('Email is required!');
  }
  if(db.get('users').find({email: req.body.email}).value() && res.locals.user.email != db.get('users').find({email: req.body.email}).value().email) {
    errors.push('Email does not exist!');
  }
  if(!req.body.password){
    errors.push('Password is required!');
  }
  if(!req.body.confirmPassword){
    errors.push('Confirm password is required!');
  }
  if(req.body.password !== req.body.confirmPassword){
    errors.push('Retype the password incorrectly');
  }
  if(errors.length){
    res.render('profile/index', {
      errors: errors,
      user: req.body
    });
    return;
  }
  next();
};

module.exports.postAvatar = (req, res, next) => {
  let errors = [];
  
  if(!req.file){
    errors.push('Please select a file!');
  }
  if(errors.length){
    res.render('profile/avatar', {
      errors: errors
    });
    return;
  }
  next();
}