const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path"); // to use path.join

const allRoutes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User } = require("./models");

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'default-secret', // Provide a default secret for local testing
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join for cross-platform compatibility

// Set up Handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up Handlebars partials
app.set('views', path.join(__dirname, 'views'));
hbs.setPartials(path.join(__dirname, 'views', 'partials')); // Correct method to set partials

// Routes
app.get('/', (req, res) => {
    res.render('homepage', { username: 'User', projectname: 'Project A', due_date: '2024-08-07' });
});

app.delete('/api/users/logout', (req, res) => {
    // Handle logout logic
    res.status(200).send('Logged out');
});

// Use your routes
app.use("/", allRoutes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
