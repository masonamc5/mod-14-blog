const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { withGuard } = require('../utils/auth');

router.get('/', withGuard, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withGuard, (req, res) => {
  res.render('newpost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});


module.exports = router;
