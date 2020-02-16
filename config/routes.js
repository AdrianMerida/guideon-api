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

// CHAT & CONVERSATION
router.get('/conversations', chatsController.getConversations)
router.get('/chats/:id', chatsController.getChats)
router.post('/chat/:id/sendMsg', chatsController.sendMsg)


// MEETING
router.get('/meetings', meetingsController.getMeetings)
router.get('/meetings/pending', meetingsController.getPendingMeetings)
router.post('/meetings/create', meetingsController.createMeeting)
router.put('/meetings/:id/decline', meetingsController.declineMeeting)
router.put('/meetings/:id/accept', meetingsController.acceptMeeting)
router.put('/meetings/:id/rate', meetingsController.rateMeeting)



module.exports = router;