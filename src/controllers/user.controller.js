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

    logger.info({ password: user.password })

    delete user['password']

    logger.info({ password: user.password })

    logger.info(`User ${username} is successfully logged in`)
    // logger.info({ user })

    let newUser = { ...user }._doc

    logger.info({ newUserpassword: newUser.password })

    delete newUser.password

    logger.info({ newUserpassword: newUser.password })

    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const register = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body

    const usernameValidated = await UserService.validateUsername(username)
    if (!usernameValidated) {
      return res.json({
        msg: ConstantMessage.USERNAME_NOT_VALID,
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
    logger.info(`User ${username} is trying to register`)

    const isEmailValid = UserService.validateEmail(email)
    if (!isEmailValid) {
      return res.json({
        msg: ConstantMessage.INVALID_EMAIL,
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
    logger.info(`User ${email} is trying to register`)

    const passwordCheck = await UserService.validatePassword(password)
    if (!passwordCheck) {
      return res.json({
        msg: ConstantMessage.PASSWORD_NOT_VALID,
        status: false,
      })
    }

    const user = await UserService.register(username, name, email, password)
    logger.info(`User ${username} is registered`)

    delete user.password

    let newUser = { ...user }._doc

    delete newUser.password

    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const updateName = async (req, res, next) => {
  try {
    const { name } = req.body
    const { id } = req.params

    logger.info({ params: req.params })

    logger.info(`User ${id} is trying to update name`)
    logger.info({ name })

    const user = await UserService.updateName(id, name)
    logger.info(`User ${id} is updated`)

    delete user.password

    let newUser = { ...user }._doc

    delete newUser.password

    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

export const updateUserUsername = async (req, res, next) => {
  try {
    const { username } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info(`User ${id} is trying to update username`)

    logger.info({ username })
    logger.info({ isusername: user.username === username })

    if (user.username === username) {
      return res.json({
        msg: ConstantMessage.USERNAME_SAME_AS_OLD,
        status: false,
      })
    }

    const usernameValidated = await UserService.validateUsername(username)
    if (!usernameValidated) {
      return res.json({
        msg: ConstantMessage.USERNAME_NOT_VALID,
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

    const updatedUser = await UserService.updateUserUsername(id, username)
    logger.info(`User ${username} is updated`)

    delete updatedUser.password

    let newUser = { ...updatedUser }._doc

    delete newUser.password

    return res.json({ status: true, user: updatedUser })
  } catch (error) {
    next(error)
  }
}

export const updateUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const { id } = req.params

    const validateEmail = await UserService.validateEmail(email)
    if (!validateEmail) {
      return res.json({
        msg: ConstantMessage.EMAIL_NOT_VALID,
        status: false,
      })
    }

    const user = await UserService.findById(id)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info(`User ${id} is trying to update email`)

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

    const updatedUser = await UserService.updateUserEmail(id, email)
    logger.info(`User ${email} is updated`)

    delete updatedUser.password

    let newUser = { ...updatedUser }._doc

    delete newUser.password

    return res.json({ status: true, user: updatedUser })
  } catch (error) {
    next(error)
  }
}

export const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const { id } = req.params

    logger.info(`User ${id} is trying to update password`)

    const user = await UserService.findById(id)
    if (!user) {
      return res.json({
        msg: ConstantMessage.USER_NOT_FOUND,
        status: false,
      })
    }
    logger.info({ user })

    const isPasswordValid = await UserService.comparePassword(
      oldPassword,
      user.password,
    )
    if (!isPasswordValid) {
      return res.json({
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
        status: false,
      })
    }
    logger.info({ isPasswordValid })

    const isNewPasswordValid = await UserService.validatePassword(newPassword)
    if (!isNewPasswordValid) {
      return res.json({
        msg: ConstantMessage.PASSWORD_NOT_VALID,
        status: false,
      })
    }
    logger.info({ isNewPasswordValid })

    if (newPassword !== confirmPassword) {
      return res.json({
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
        status: false,
      })
    }
    logger.info({ confirmPassword: newPassword !== confirmPassword })

    const updatedUser = await UserService.updateUserPassword(id, newPassword)
    logger.info(`User ${id} is updated`)

    delete updatedUser.password

    let newUser = { ...updatedUser }._doc

    delete newUser.password

    return res.json({ status: true, user: updatedUser })
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
