const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");
const Book = require("../models/book.model");

module.exports.index = async (req, res) => {
  async function dataa(arr) {
    let newArr = [];
    for (let item of arr) {
      newArr.push({
        transactionId: item.id,
        isComplete: item.isComplete,
        user: await User.findById({ _id: item.userId }),
        book: await Book.findById({ _id: item.bookId })
      });
    }
    return newArr;
  }

  let transactions = await Transaction.find();
  let data = await dataa(
    transactions.filter(item => item.userId == req.signedCookies.userId)
  );

  if (res.locals.isAdmin) {
    data = await dataa(transactions);
  }

  let page = parseInt(req.query.p ? req.query.p : 1);
  let perPage = 2;
  let begin = perPage * (page - 1);
  let end = perPage * page;
  let pageMax = Math.ceil(data.length / perPage);
  res.render("transactions/index", {
    data: data.slice(begin, end),
    page: page,
    pageMax: pageMax
  });
};

module.exports.create = async (req, res) => {
  res.render("transactions/create", {
    users: await User.find(),
    books: await Book.find()
  });
};

module.exports.complete = (req, res) => {
  Transaction.findById(req.params.id, (err, transaction) => {
    if (!transaction) {
      res.send(
        '<script>alert("Id does not exits!");location.href="/transactions"</script>'
      );
    } else {
      Transaction.findByIdAndUpdate(req.params.id, { isComplete: true }).exec();
      res.redirect("/transactions");
    }
  });
};

module.exports.postCreate = async (req, res) => {
  req.body.isComplete = false;
  await Transaction.create(req.body);
  res.redirect("/transactions");
};