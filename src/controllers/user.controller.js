import * as UserService from '../services/user.service'
import * as ConstantMessage from '../constants/message.constant'

import logger from '../utils/logger.util'

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await UserService.findByUser(username)
    if (!user) {
      return res.json({
        msg: ConstantMessage.INCORRECT_USERNAME_OR_PASSWORD,
        status: false,
      })
    }

    logger.info(`User ${username} is trying to login`)

    const isPasswordValid = await UserService.validedPassword(
      password,
      user.password,
    )
    if (!isPasswordValid) {
      return res.json({
        msg: ConstantMessage.INCORRECT_USERNAME_OR_PASSWORD,
        status: false,
      })
    }
    logger.info(`password valid >> ${{ password: isPasswordValid }}`)

    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const usernameCheck = await UserService.findByUser(username)
    if (usernameCheck) {
      return res.json({
        msg: ConstantMessage.USERNAME_ALREADY_EXIST,
        status: false,
      })
    }
    logger.info(`User ${username} is trying to register`)

    const emailCheck = await UserService.findByEmail(email)
    if (emailCheck) {
      return res.json({
        msg: ConstantMessage.EMAIL_ALREADY_EXIST,
        status: false,
      })
    }
    logger.info(`User ${email} is trying to register`)

    const user = await UserService.register(username, email, password)
    logger.info(`User ${username} is registered`)

    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers(req.params.id)
    logger.info(`User ${req.params.id} is trying to get all users`)
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

export const setAvatar = async (req, res, next) => {
  try {
    const userData = await UserService.setAvatar(req.params.id, req.body.image)
    logger.info(`User ${req.params.id} is trying to set avatar`)
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    })
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.json({ msg: ConstantMessage.USER_ID_IS_REQUIRED })
    }
    logger.info(`User ${req.params.id} is trying to logout`)
    onlineUsers.delete(req.params.id)
    return res.status(200).send()
  } catch (error) {
    next(error)
  }
}
