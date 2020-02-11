const User = require('../models/user.model')
const Chat = require('../models/chat.model')
const Conversation = require('../models/conversation.model')

module.exports.sendMsg = (req, res, next) => {

  const myUserId = req.session.user.id
  const userId = req.params.id
  const msg = req.body.msg
  const users = [myUserId, userId]

  Conversation.find({ users: users, users: users.reverse() })
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
              .then(chat => res.status(204).json(chat))
          })
      } else {
        const newChat = new Chat({
          conversationId: conversation.id,
          sender: myUserId,
          msg: msg
        })
        newChat.save()
          .then(chat => res.status(204).json(chat))
      }
    })
    .catch(next)
}