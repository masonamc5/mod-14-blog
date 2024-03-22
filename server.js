const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");

const homeRoutes = require("./controllers/home");
const userRoutes = require("./controllers/user");
const dashboardRoutes = require("./controllers/dashboard");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/dashboard", dashboardRoutes);

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in || false;
  next();
});

app.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("login", { loggedIn: req.session.logged_in });
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
