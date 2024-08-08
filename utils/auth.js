const withAuth = async (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      await req.session.destroy();
      res.redirect('/login');
    }
    
    else {
      next();
    }
  };
  
  module.exports = withAuth;