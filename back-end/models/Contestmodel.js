// models/Waitlist.js
import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  coupon: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  users: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    position: {
      type: Number,
      required: true
    }
  }]
}, { versionKey: false });

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

export { Waitlist };
