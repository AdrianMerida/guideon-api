const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const chatsController = require('../controllers/chats.controller')
const meetingsController = require('../controllers/meetings.controller')

// USER
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)

// CHAT
router.post('/', chatsController.sendMsg)
router.post('/', chatsController.getChat)

// MEETING
router.get('/', meetingsController.getPendingMeeting)
router.put('/', meetingsController.declineMeeting)
router.put('/', meetingsController.acceptMeeting)
router.put('/', meetingsController.rateMeeting)



module.exports = router;