const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Chat = require('./chat.model')

const conversationSchema = new Schema(
  {
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }]
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

conversationSchema.virtual('chats', {
  ref: Chat.modelName,
  localField: '_id',
  foreignField: 'conversationId',
  options: { sort: { position: -1 } },
  justOne: true
});

const Conversation = new mongoose.model('Conversation', conversationSchema)

module.exports = Conversation