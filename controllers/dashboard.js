const express = require("express");
const router = express.Router();
const { Post } = require("../models");

router.get("/dashboard", async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    console.log(userPosts);
    res.render("dashboard", { userPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/newpost", async (req, res) => {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });
    console.log(newPost);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
