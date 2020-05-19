const Session = require("../models/session.model");

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    let session = await Session.create({});
    res.cookie("sessionId", session._id, {
        signed: true
      });
  }
    let cartCount = 0;
    await Session.findById(req.signedCookies.sessionId, (err, session) => {
      if(session) {
        for(let key in session.cart){
          cartCount += parseInt(session.cart[key]);
        }
      }
      res.locals.cartCount = cartCount;
    });
  next();
};
