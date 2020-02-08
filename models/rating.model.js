const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratingSchema = new Schema(
  {
    valuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    valued: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => { // Solo devuelve la puntuación
        ret.id = doc._id;
        delete ret.valuer;
        delete ret.valued;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
)

const Rating = new mongoose.model('Rating', ratingSchema)

module.exports = Rating