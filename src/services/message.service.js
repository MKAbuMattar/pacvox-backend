import MessageModel from '../models/message.model'

export const getMessages = async (from, to) => {
  const messages = await MessageModel.find({
    users: {
      $all: [from, to],
    },
  }).sort({ updatedAt: 1 })

  return messages
}

export const addMessage = async (from, to, message) => {
  const newMessage = await MessageModel.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  })

  return newMessage
}
