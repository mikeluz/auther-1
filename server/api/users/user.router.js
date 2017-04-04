'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var Story = require('../stories/story.model');

router.param('id', function (req, res, next, id) {
  User.findById(id)
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (user) {
    res.status(201).json(user);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.requestedUser.reload(User.options.scopes.populated())
  .then(function (requestedUser) {
    res.json(requestedUser);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.requestedUser.update(req.body)
  .then(function (user) {
    res.json(user);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedUser.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    where: {
      email: email,
      password: password
    }
  })
  .then(function (user) {
    if (!user) {
      res.status(401).send();
    } else {
      console.log('Login Successfull');
      req.session.userId = user.id;
      console.log(req.session);
      res.status(200).send();
    }
  })
  .catch(next);

});

module.exports = router;
