const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//When login button clicked this is the route that runs to render the homepage //
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const userData = await User.findOne({ where: { email } });
  
      if (!userData) {
        res.status(400).json({ message: 'No user found with that email address!' });
        return;
      }
  
      // Check if the password is correct
      const validPassword = await userData.checkPassword(password);
  
      if (!validPassword) {
        console.log('Incorrect Password');
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      // Save user data in session
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
        console.log('Session saved, user logged in'); 
        res.status(200).json({ message: 'You are now logged in!' });
      });
    } catch (err) {
      console.error('Error in login route:', err);  
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Logout
  router.delete("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;