const User = require('../models/user.model');
const Rating = require('../models/rating.model')
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

module.exports.rateUser = (req, res, next) => {
  const myUserId = req.session.user.id
  const userId = req.params.id
  const rating = req.body.rating
  const newRating = new Rating({
    valuer: myUserId,
    valued: userId,
    rating: rating
  })

  newRating.save()
    .then(rating => res.status(204).json(rating))
    .catch(next)
}

module.exports.validateUser = (req, res, next) => {

  User.findOne({ validateToken: req.params.token })
    .then(user => {
      if (user) {
        user.validated = true
        user.save()
          .then(() => {
            res.status(204).json()
          })
          .catch(next)
      } else {
        res.status(404).json()
      }
    })
    .catch(next)
}

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.session.user.id, { $set: req.body }, { new: true })
    .then(user => {
      req.session.user = user
      res.json(user)
    })
    .catch(next)
}

module.exports.switchAvailability = (req, res, next) => {
  User.findByIdAndUpdate(req.session.user.id, { $set: { available: !req.session.user.available } }, { new: true })
    .then(user => {
      req.session.user.available = !req.session.user.available
      res.json(user)
    })
    .catch(next)
}

module.exports.switchUserState = (req, res, next) => {

  const states = {
    offer: 'demand',
    demand: 'offer'
  }

  User.findByIdAndUpdate(req.session.user.id, { $set: { state: states[req.session.user.state] } }, { new: true })
    .then(user => {
      req.session.user.state = states[req.session.user.state] // DUDA, ASÍ ESTÁ OK?
      res.json(user)
    })
    .catch(next)
}

module.exports.updateUserCost = (req, res, next) => {

  const { cost } = req.body

  User.findByIdAndUpdate(req.session.user.id, { $set: { cost: parseInt(cost) } }, { new: true })
    .then(user => {
      req.session.user.cost = parseInt(cost)
      res.json(user)
    })
    .catch(next)
}