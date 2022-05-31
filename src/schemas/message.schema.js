import mongoose from 'mongoose'
import * as ConstantModel from '../constants/model.constant'

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ConstantModel.USERMODEL,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default MessageSchema
