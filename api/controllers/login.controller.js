const User = require('../../models/user.model');

module.exports =  async (req, res) => {
  let user = await User.find({email: req.body.email});
  res.json(user);
}