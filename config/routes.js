const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const chatsController = require('../controllers/chats.controller')
const meetingsController = require('../controllers/meetings.controller')
const uploader = require('./cloudinary.config');
const authMiddleware = require('../middlewares/auth.middleware')

// USER
router.post('/register', authMiddleware.isNotAuthenticated, usersController.register)
router.post('/uploadImage', authMiddleware.isNotAuthenticated, uploader.single("avatarUrl"), usersController.uploadImage)
router.post('/login', authMiddleware.isNotAuthenticated, usersController.login)
router.post('/logout', authMiddleware.isAuthenticated, usersController.logout)
router.put('/myProfile', authMiddleware.isAuthenticated, usersController.updateProfile)
router.post('/users/:id/rate', authMiddleware.isAuthenticated, usersController.rateUser)
router.put('/validate/:token', authMiddleware.isAuthenticated, usersController.validateUser)
router.put('/switchAvailability', authMiddleware.isAuthenticated, usersController.switchAvailability)
router.put('/switchUserState', authMiddleware.isAuthenticated, usersController.switchUserState) // offer-demand
router.put('/updateCost', authMiddleware.isAuthenticated, usersController.updateUserCost)
router.get('/users', authMiddleware.isAuthenticated, usersController.getUsers)

// CHAT & CONVERSATION
router.get('/conversations', authMiddleware.isAuthenticated, chatsController.getConversations)
router.get('/chats/:id', authMiddleware.isAuthenticated, chatsController.getChats)
router.post('/chat/:id/sendMsg', authMiddleware.isAuthenticated, chatsController.sendMsg)


// MEETING
router.get('/meetings', authMiddleware.isAuthenticated, meetingsController.getMeetings)
router.get('/meetings/pending', authMiddleware.isAuthenticated, meetingsController.getPendingMeetings)
router.post('/meetings/create', authMiddleware.isAuthenticated, meetingsController.createMeeting)
router.put('/meetings/:id/decline', authMiddleware.isAuthenticated, meetingsController.declineMeeting)
router.put('/meetings/:id/accept', authMiddleware.isAuthenticated, meetingsController.acceptMeeting)
router.put('/meetings/:id/rate', authMiddleware.isAuthenticated, meetingsController.rateMeeting)



module.exports = router;