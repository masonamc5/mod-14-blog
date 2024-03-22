const express = require("express");
const router = express.Router();
const dashboardRoutes = require("./dashboard");
const homeRoutes = require("./home");
const userRoutes = require("./user");

router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
router.use("/user", userRoutes);

module.exports = router;
