const router = require('express').Router();
const { User } = require('../models/user'); 
router.get('/login-state', (req, res) => {
  if (req.session.logged_in) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post('/', async (req, res) => {
  try {
    const loginData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!loginData) {
      return res.status(400).json({ message: 'Incorrect login, try again.' });
    }

    const validPassword = await loginData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password, try again.' });
    }

    req.session.login_id = loginData.id;
    req.session.logged_in = true;
    
    return res.status(200).json({ user_id: loginData.id }); 
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
