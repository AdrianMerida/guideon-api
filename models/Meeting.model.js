const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    senderRating: {
      type: Number,
      min: 0,
      max: 10,
      default: null
    },
    receiverRating: {
      type: Number,
      min: 0,
      max: 10,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
)

const Meeting = new mongoose.model('Meeting', meetingSchema)

module.exports = Meeting