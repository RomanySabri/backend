import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notfication: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
