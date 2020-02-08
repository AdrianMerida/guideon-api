const User = require('../models/user.model');
const mongoose = require('mongoose');
const createError = require('http-errors');
// const mailer = require('../config/mailer.config');

module.exports.register = (req, res, next) => {

  const newUser = new User(req.body)
  newUser.save()
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.login = (req, res, next) => {

  // Si existe el usuario => 403
  if (req.session.user) {
    throw createError(403, 'Forbidden')
  }

  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'Missing credentials!')
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        throw createError(404, 'Wrong credentials')
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              throw createError(404, 'Wrong credentials')
            } else {
              req.session.user = user
              res.json(user)
            }
          })
      }
    })
    .catch(next);
}

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.status(204).json();
}