const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Rating = require('./rating.model')
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minlength: [3, 'You need at least 3 characters!'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Invalid email!']
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [8, 'Password needs at last 8 chars!']
    },
    description: {
      type: String,
      default: null
    },
    avatar: {
      type: String
    },
    validateToken: {
      type: String,
      default: generateRandomToken
    },
    validated: {
      type: Boolean,
      default: true // de momento a true
    },
    phoneNumber: {
      type: String,
      minlength: [9, 'Must have 9 digits!'],
      required: [true, 'Phone number is required!'],
      unique: true
    },
    bankAccout: {
      type: String,
      default: null
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date required!']
    },
    available: {
      type: Boolean,
      default: true
    },
    state: {
      type: String,
      enum: ['offer', 'demand'],
      default: 'offer'
    },
    cost: {
      type: Number,
      min: 0,
      default: 0 // $ 
    },
    availableTime: {
      type: Number,
      min: 0,
      max: 24,
      default: 0 // hours
    },
    location: {
      type: String,
      default: null // cambiarlo a geolocalización (más tarde)
    }

  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => { //ret => return
        ret.id = doc._id;
        delete password;
        delete validated;
        delete validateToken;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
)

userSchema.virtual('rating', {
  ref: Rating.modelName,
  localField: '_id',
  foreignField: 'valued'
  // options: { sort: { position: -1 } }
});

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = new mongoose.model('User', userSchema)

module.exports = User