import * as MessageService from '../services/message.service'
import * as ConstantMessage from '../constants/message.constant'

import logger from '../utils/logger.util'

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body

    const messages = await MessageService.getMessages(from, to)
    logger.info(`Get messages from ${from} to ${to}`)

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    })
    logger.info(`Projected messages: ${JSON.stringify(projectedMessages)}`)

    res.json(projectedMessages)
  } catch (error) {
    next(error)
  }
}

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await MessageService.addMessage(from, to, message)
    logger.info(`Add message from ${from} to ${to}`)

    if (!data) {
      return res.json({
        msg: ConstantMessage.FAILED_TO_ADD_MESSAGE_TO_THE_DATABASE,
      })
    }
    return res.json({ msg: ConstantMessage.MESSAGE_ADDED_SUCCESSFULLY })
  } catch (error) {
    next(error)
  }
}
