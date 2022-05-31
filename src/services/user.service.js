import bcrypt from 'bcrypt'
import UserModel from '../models/user.model'

export const findByUser = async (username) => {
  return await UserModel.findOne({ username })
}

export const findByEmail = async (email) => {
  return await UserModel.findOne({ email })
}

export const validedPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const register = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({
    email,
    username,
    password: hashedPassword,
  })

  return newUser
}

export const getAllUsers = async (id) => {
  return await UserModel.find({ _id: { $ne: id } }).select([
    'email',
    'username',
    'avatarImage',
    '_id',
  ])
}

export const setAvatar = async (userId, avatarImage) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    {
      isAvatarImageSet: true,
      avatarImage,
    },
    { new: true },
  )
}
