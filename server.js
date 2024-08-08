const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const path = require("path");

const allRoutes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
  secret: process.env.SESSION_SECRET || 'default-secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars
const hbs = exphbs.create({
  partialsDir: path.join(__dirname, 'views', 'partials'),
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Use your routes
app.use(allRoutes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('Error syncing database:', err);
});