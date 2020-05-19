require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const User = require('./models/user.model');

const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const transactionRoute = require("./routes/transaction.route");
const authRoute = require("./routes/auth.route");
const profileRoute = require("./routes/profile.route");
const cartRoute = require("./routes/cart.route");
const apiTransactionRoute = require('./api/routes/transaction.route');
const apiLoginRoute = require('./api/routes/login.route');
const apiBookRoute = require('./api/routes/book.route');

const countCookie = require('./middlewares/countCookie.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.use(countCookie);
app.use(sessionMiddleware);

app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/transactions",authMiddleware.requireAuth, transactionRoute);
app.use("/auth", authRoute);
app.use("/profile",authMiddleware.requireAuth, profileRoute);
app.use("/cart", cartRoute);
app.use("/api/transactions", apiTransactionRoute);
app.use("/api/login", apiLoginRoute);
app.use("/api/books", apiBookRoute);

app.get("/", (req, res) => {
  res.cookie('test-cookie','12345');
  res.render("index");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});