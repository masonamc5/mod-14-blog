const express = require('express');
const router = express.Router();
const { Post } = require('../models');


router.get('/new-post', (req, res) => {
  res.render('newpost'); 
});

router.post("/newpost", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  } 
});

router.get("/", async (req, res) => {
  try {
    
    const allPosts = await Post.findAll();

    res.render("dashboard", { posts: allPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
