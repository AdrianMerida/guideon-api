const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const chatsController = require('../controllers/chats.controller')
const meetingsController = require('../controllers/meetings.controller')

// USER
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)
router.put('/myProfile', usersController.updateProfile)
router.post('/users/:id/rate', usersController.rateUser)
router.put('/validate/:token', usersController.validateUser)
router.put('/switchAvailability', usersController.switchAvailability)
router.put('/switchUserState', usersController.switchUserState) // offer-demand
router.put('/updateCost', usersController.updateUserCost) 

// CHAT
// router.post('/', chatsController.sendMsg)
// router.post('/', chatsController.getChat)

// // MEETING
// router.get('/', meetingsController.getPendingMeeting)
// router.put('/', meetingsController.declineMeeting)
// router.put('/', meetingsController.acceptMeeting)
// router.put('/', meetingsController.rateMeeting)



module.exports = router;