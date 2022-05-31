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
    logger.info({ username: user.username })

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

export const updateUserUsername = async (req, res, next) => {
  try {
    const { username } = req.body
    const { userId } = req.params

    const user = await UserService.findById(userId)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info(`User ${userId} is trying to update username`)

    if (user.username === username) {
      return res.json({
        msg: ConstantMessage.USERNAME_SAME_AS_OLD,
        status: false,
      })
    }

    const usernameCheck = await UserService.findByUser(username)
    if (usernameCheck) {
      return res.json({
        msg: ConstantMessage.USERNAME_ALREADY_EXIST,
        status: false,
      })
    }
    logger.info(`User ${username} is trying to update username`)

    const updatedUser = await UserService.updateUserUsername(userId, username)
    logger.info(`User ${username} is updated`)

    delete updatedUser.password
    return res.json({ status: true, updatedUser })
  } catch (error) {
    next(error)
  }
}

export const updateUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const { userId } = req.params

    const user = await UserService.findById(userId)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info(`User ${userId} is trying to update email`)

    if (user.email === email) {
      return res.json({
        msg: ConstantMessage.EMAIL_SAME_AS_OLD,
        status: false,
      })
    }

    const emailCheck = await UserService.findByEmail(email)
    if (emailCheck) {
      return res.json({
        msg: ConstantMessage.EMAIL_ALREADY_EXIST,
        status: false,
      })
    }
    logger.info(`User ${email} is trying to update email`)

    const updatedUser = await UserService.updateUserEmail(userId, email)
    logger.info(`User ${email} is updated`)

    delete updatedUser.password
    return res.json({ status: true, updatedUser })
  } catch (error) {
    next(error)
  }
}

export const updateUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body
    const { userId } = req.params

    const user = await UserService.findById(userId)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info(`User ${userId} is trying to update password`)

    if (user.password === password) {
      return res.json({
        msg: ConstantMessage.PASSWORD_SAME_AS_OLD,
        status: false,
      })
    }

    const hashedPassword = await UserService.validedPassword(
      password,
      user.password,
    )
    if (!hashedPassword) {
      return res.json({
        msg: ConstantMessage.OLDPASSWORD_INCORRECT,
        status: false,
      })
    }
    logger.info(`password valid >> ${{ password: hashedPassword }}`)

    const updatedUser = await UserService.updateUserPassword(userId, password)
    logger.info(`User ${username} is updated`)

    delete updatedUser.password
    return res.json({ status: true, updatedUser })
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
