import bcrypt from 'bcrypt'
import UserModel from '../models/user.model'

export const findById = async (id) => {
  return await UserModel.find({ _id: { $ne: id } })
}

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

export const updateUserUsername = async (userId, username) => {
  return await UserModel.findByIdAndUpdate(userId, { username }, { new: true })
}

export const updateUserEmail = async (userId, email) => {
  return await UserModel.findByIdAndUpdate(userId, { email }, { new: true })
}

export const updateUserPassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await UserModel.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true },
  )
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
