const Meeting = require('../models/meeting.model')
const mongoose = require('mongoose')

module.exports.getMeetings = (req, res, next) => {
  const myUserId = req.session.user.id
  Meeting.find({ $and: [{ $or: [{ sender: myUserId }, { receiver: myUserId }] }, { state: { $ne: 'declined' } }] })
    .then(meetings => res.json(meetings))
    .catch(next)
}

module.exports.getPendingMeetings = (req, res, next) => {
  const myUserId = req.session.user.id
  Meeting.find({ $and: [{ $or: [{ sender: myUserId }, { receiver: myUserId }] }, { state: 'pending' }] })
    .then(meetings => res.json(meetings))
    .catch(next)
}

module.exports.createMeeting = (req, res, next) => {

  //   SOLO PARA POSTMAN
  // const data = {
  //   'sender': mongoose.Types.ObjectId(req.body.sender),
  //   'receiver': mongoose.Types.ObjectId(req.body.receiver),
  //   'location': req.body.location,
  //   'duration': req.body.duration
  // }
  // const newMeeting = new Meeting(data)

  const newMeeting = new Meeting(req.body)
  newMeeting.save()
    .then(meeting => res.json(meeting))
    .catch(error => console.log('ERROR => ', error))
}

module.exports.declineMeeting = (req, res, next) => {
  const meetingId = req.params.id
  Meeting.findByIdAndUpdate({ _id: meetingId }, { $set: { state: 'declined' } }, { new: true })
    .then(meeting => res.json(meeting))
    .catch(next)
}

module.exports.acceptMeeting = (req, res, next) => {
  const meetingId = req.params.id
  Meeting.findByIdAndUpdate({ _id: meetingId }, { $set: { state: 'accepted' } }, { new: true })
    .then(meeting => res.json(meeting))
    .catch(next)
}

module.exports.rateMeeting = (req, res, next) => {
  const meetingId = req.params.id
  const { rate } = req.body

  Meeting.findOne({ _id: meetingId })
    .then(meeting => {
      if (meeting) {
        if (meeting.sender.equals(req.session.user.id)) {
          Meeting.findByIdAndUpdate({ _id: meetingId }, { $set: { senderRating: parseInt(rate) } }, { new: true })
            .then(meet => res.json(meet))
        } else {
          Meeting.findByIdAndUpdate({ _id: meetingId }, { $set: { receiverRating: parseInt(rate) } }, { new: true })
            .then(meet => res.json(meet))
        }
      } else {
        res.json('Not found')
      }
    })
    .catch(next)
}