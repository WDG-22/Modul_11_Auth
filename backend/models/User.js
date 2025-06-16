import { Schema, model } from 'mongoose';

const readingListEntry = new Schema({
  bookRefId: {
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  status: {
    type: String,
    enum: ['read', 'pending', 'unknown', 'wishlist'],
    default: 'unknown',
  },
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  readingList: [readingListEntry],
  email: String,
  password: {
    type: String,
    select: false,
  },
});

const User = model('user', userSchema);
export default User;
