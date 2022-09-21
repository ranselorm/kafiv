const express = require("express");
const path = require("path");
// const mongoose = require("mongoose");
// const { userSchema } = require("./schemas");
const ejsMate = require("ejs-mate");
const AppError = require("./utils/AppError");
const catchAsync = require("./utils/catchAsync");
// const User = require("./model/user");

const uri = process.env.MONGODB_URI;

// mongoose.connect(uri || "mongodb://localhost:27017/registration");

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//---------------------------------------------------------------------------------
// const validateUser = (req, res, next) => {
//   const { error } = userSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message);
//     throw new AppError(msg, 404);
//   } else {
//     next();
//   }
// };

//---------------------------------------------------------------------------------
// GET ROUTES

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/success", (req, res) => {
  res.render("success");
});
// -------------------------------------------------------------------------------------

app.post(
  "/signup",
  catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = new User(data);
    await user.save();
    return res.redirect("/success");
  })
);

app.use("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("error", { err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
