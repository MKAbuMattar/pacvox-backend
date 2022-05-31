import express from 'express'
import * as UserController from '../controllers/user.controller'

import * as ConstantAPI from '../constants/api.constant'

const router = express.Router()

router.post(ConstantAPI.USER_LOGIN, UserController.login)
router.post(ConstantAPI.USER_REGISTER, UserController.register)
router.get(ConstantAPI.USER_GET_ALL_USERS, UserController.getAllUsers)
router.post(ConstantAPI.USER_SET_AVATAR, UserController.setAvatar)
router.get(ConstantAPI.USER_LOGOUT, UserController.logout)

export default router
