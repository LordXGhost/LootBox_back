var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Authentification */
router.get('/register', (req, res) => {
  res.render('register', { title: 'Créer un compte' });
});

router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username, email: req.body.email });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register', { title: 'Créer un compte' });
    }
    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/');
});


module.exports = router;
