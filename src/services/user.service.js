import bcrypt from 'bcrypt'
import UserModel from '../models/user.model'

export const findById = async (id) => {
  return await UserModel.findById(id)
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

export const register = async (username, name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await UserModel.create({
    username,
    name,
    email,
    password: hashedPassword,
  })

  return newUser
}

export const updateName = async (userId, name) => {
  return await UserModel.findByIdAndUpdate(userId, { name }, { new: true })
}

export const updateUserUsername = async (userId, username) => {
  return await UserModel.findByIdAndUpdate(userId, { username }, { new: true })
}

export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const updateUserEmail = async (userId, email) => {
  return await UserModel.findByIdAndUpdate(userId, { email }, { new: true })
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const validatePassword = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return re.test(String(password))
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
