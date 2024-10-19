import mongoose, {Schema, Types} from 'mongoose';
import User from './User';


const PhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value)
        return Boolean(user);
      },
      message: 'User not found',
    }
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
})

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;