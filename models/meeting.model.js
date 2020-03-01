const mongoose = require('mongoose')
const Schema = mongoose.Schema

const states = ['pending', 'accepted', 'declined']

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
      default: undefined
    },
    location: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
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
    },
    state: { // Si acepta o no el encuentro
      type: String,
      enum: states,
      default: 'pending'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
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