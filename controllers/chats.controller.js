const Chat = require('../models/chat.model')
const Conversation = require('../models/conversation.model')

module.exports.getConversations = (req, res, next) => {
  Conversation.find({ users: req.session.user.id })
    .populate('users')
    .populate({
      path: 'chats',
      populate: {
        path: 'sender'
      }
    })
    .then(conversations => res.json(conversations))
    .catch(next)
}

module.exports.getOneConversation = (req, res, next) => {
  const converId = req.params.id
  Conversation.findById(converId)
    .populate('users')
    .then(conversation => res.json(conversation))
    .catch(next)
}

module.exports.getChats = (req, res, next) => {
  const conversationId = req.params.id
  Chat.find({ conversationId: conversationId })
    .then(chats => res.json(chats))
    .catch(next)
}

module.exports.sendMsg = (req, res, next) => {

  const myUserId = req.session.user.id
  const userId = req.params.id
  const msg = req.body.msg
  const users = [myUserId, userId]

  // SINO EXISTE SE CREA UNA CONVERSACIÓN Y SI NO SE GUARDA
  Conversation.findOne({ users: users, users: users.reverse() })
    .then(conversation => {
      if (!conversation) {
        const newConversation = new Conversation({ users })
        newConversation.save()
          .then(newConver => {
            const newChat = new Chat({
              conversationId: newConver.id,
              sender: myUserId,
              msg: msg
            })
            newChat.save()
              .then(chat => res.json(chat))
          })
      } else {
        const newChat = new Chat({
          conversationId: conversation.id,
          sender: myUserId,
          msg: msg
        })
        newChat.save()
          .then(chat => res.json(chat))
      }
    })
    .catch(next)
}

