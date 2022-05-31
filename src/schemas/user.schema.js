import mongoose from 'mongoose'
import * as ConstantNumber from '../constants/number.constant'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: ConstantNumber.USERNAME_MIN_LENGTH,
      max: ConstantNumber.USERNAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: ConstantNumber.EMAIL_MAX_LENGTH,
    },
    password: {
      type: String,
      required: true,
      min: ConstantNumber.PASSWORD_MIN_LENGTH,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

export default UserSchema
