const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// route for when the create account button is clicked //
router.post('/create-account', async (req, res) => {
    try {
      const { email ,username, password } = req.body;

      // Checking if the username already exists
      const existingUser = await User.findOne({ where: { username : username } });
      if (existingUser) {
        return res.json({ success: false, message: 'Username already taken.' });
      }

      // Hash the password before saving
      // const hashedPassword = await bcrypt.hash(password, 10);
      // console.log(hashedPassword);

      // Create a new user
      await User.create({
        email,
        username,
        password
      });

      // If the account is successfully created, send success response
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to create account. Please try again.' });
    }
  });


//When login button clicked this is the route that runs to render the homepage //
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username); 
  
      // Find the user by email
      const userData = await User.findOne({ where: { username} });
  
      if (!userData) {
        res.status(400).json({ message: 'No user found with that username !' });
        return;
      }
  
      // Check if the password is correct
      const validPassword = await userData.checkPassword(password);
      console.log(validPassword);
      console.log(password);
      console.log(userData);
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
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
     res.status(204).end();
 })
});



  // // Logout
  // router.post("/logout", (req, res) => {
  //   if (req.session.loggedIn) {
  //     req.session.destroy(() => {
  //       res.status(204).end();
  //     });
  //   } else {
  //     res.status(404).end();
  //   }
  // });


  router.get('/', (req, res) => {
    User.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ msg: "error", err});
      });
  });



module.exports = router;