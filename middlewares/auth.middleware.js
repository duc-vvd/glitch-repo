const User = require("../models/user.model");

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }

  User.findById(req.signedCookies.userId, (err, user) => {
    if (!user) {
      res.redirect("/auth/login");
    } else {
      if (user.isAdmin) {
        res.locals.isAdmin = true;
      }

      res.locals.user = user;
      next();
    }
  });
};
