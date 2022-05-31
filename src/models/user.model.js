import mongoose from 'mongoose'
import UserSchema from '../schemas/user.schema'
import * as ConstantModel from '../constants/model.constant'

const UserModel = mongoose.model(ConstantModel.USERMODEL, UserSchema)

export default UserModel
