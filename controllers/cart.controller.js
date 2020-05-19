const Session = require("../models/session.model");

module.exports.add = (req, res) => {
  let bookId = req.params.bookId;
  Session.findById(req.signedCookies.sessionId, (err, session) => {
    let count = 1;
    let cart = {};
    
    if (session.cart) {
      
      cart = session.cart;

      if (session.cart[bookId]) {
        count = session.cart[bookId] + 1;
      }
    }

    let update = { ...cart, [bookId]: count };
    Session.updateOne({ _id: session._id }, { cart: update }).exec();
  });
  res.redirect("/books");
};
