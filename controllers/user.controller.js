const md5 = require("md5");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.p ? req.query.p : 1);
  const perPage = 2;
  const begin = perPage * (page - 1);
  const userCount = await User.count();
  const users = await User.find({}, null, { skip: begin }).limit(perPage);
  const pageMax = Math.ceil(userCount / perPage);
  res.render("users/index", {
    users: users,
    page: page,
    pageMax: pageMax
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.update = async (req, res) => {
  res.render("users/update", {
    user: await User.findById(req.params.id)
  });
};

module.exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (!user) {
      res.send(
        '<script>alert("Id does not exits!");location.href="/users"</script>'
      );
    } else {
      res.redirect("/users");
    }
  });
};

module.exports.postCreate = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  User.create(req.body);

  res.redirect("/users");
};

module.exports.postUpdate = (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body).exec();
  res.redirect("/users");
};
