const withGuard = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  const apiGuard = (req, res, next) => {
    if (!req.session.logged_in) {
      res.status(403).json({ msg: 'you must login to perform this action' });
    } else {
      next();
    }
  };
  
  const withoutGuard = (req, res, next) => {
    if (!req.session.logged_in) {
      next();
    } else {
      res.redirect('/');
    }
  };
  
  module.exports = { withGuard, apiGuard, withoutGuard };
  