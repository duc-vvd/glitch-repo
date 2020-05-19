const User = require("../models/user.model");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let email = req.body.email;

  User.findOne({ email: email }, (err, user) => {
    if (!user) {
      res.render("auth/login", {
        errors: ["Email does not exist!"]
      });
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      if (user.wrongLoginCount > 4) {
        const msg = {
          to: email,
          from: "gamethu.thegioigame@gmail.com",
          subject: "Login warning for Book management",
          text: "You have entered the wrong password more than 4 times",
          html:
            "<strong>You have entered the wrong password more than 4 times</strong>"
        };
        sgMail.send(msg).then(
          () => {},
          error => {
            console.error(error);

            if (error.response) {
              console.error(error.response.body);
            }
          }
        );

        res.render("auth/login", {
          errors: ["You have entered the wrong password more than four times!"]
        });
      } else {
        User.findByIdAndUpdate(user.id, {
          wrongLoginCount: user.wrongLoginCount ? ++user.wrongLoginCount : 1
        }).exec();
        res.render("auth/login", {
          errors: ["Wrong password!"]
        });
      }
    } else {
      res.cookie("userId", user.id, {
        signed: true
      });

      res.redirect("/");
    }
  });
};
