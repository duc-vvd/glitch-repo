let count = 0;

module.exports = (req, res, next) => {
  if(req.cookies){
    console.log('cookie: ', ++count);
  }else{
    console.log(req.cookies);
  }
  next();
}