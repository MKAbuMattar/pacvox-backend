import express from 'express'
import * as MessageController from '../controllers/message.controller'

import * as ConstantAPI from '../constants/api.constant'

const router = express.Router()

router.post(ConstantAPI.MESSAGE_ADD_MESSAGE, MessageController.addMessage)
router.post(ConstantAPI.MESSAGE_GET_MESSAGES, MessageController.getMessages)

export default router
