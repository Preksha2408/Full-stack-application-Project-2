const router = require('express').Router();
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');

// router.get("/", (req, res) => {
//   Project.findAll({
//     include: [User],
//   }).then((projData) => {
//     const hbsProj = projData.map((proj) => proj.toJSON());
//     res.render("homepage", {
//       projects: hbsProj,
//       loggedIn: req.session.loggedIn,
//     });
//   });
// });

// router.get("/project/:id", (req, res) => {
//   Project.findByPk(req.params.id, {
//     include: [User],
//   }).then((proj) => {
//     hbsData = proj.toJSON();
//     hbsData.loggedIn = req.session.loggedIn;
//     res.render("project", hbsData);
//   });
// });

// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/profile");
//   }
//   res.render("login", {
//     loggedIn: false,
//   });
// });

module.exports = router;

