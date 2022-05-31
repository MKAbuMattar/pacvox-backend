import mongoose from 'mongoose'
import MessageSchema from '../schemas/message.schema'
import * as ConstantModel from '../constants/model.constant'

const MessageModel = mongoose.model(ConstantModel.MESSAGEMODEL, MessageSchema)

export default MessageModel
