const Meeting = require('../models/meeting.model')

module.exports.getMeetings = (req, res, next) => {
  const myUserId = req.session.user.id
  Meeting.find({ sender: myUserId, receiver: myUserId })
    .then(meetings => res.json(meetings))
    .catch(next)
}

module.exports.getPendingMeetings = (req, res, next) => {
  const myUserId = req.session.user.id
  Meeting.find({ $and: [{ $or: [{ sender: myUserId, receiver: myUserId }], state: 'pending' }] })
    .then(meetings => res.json(meetings))
    .catch(next)
}
