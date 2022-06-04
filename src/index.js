import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { DATABASE_URL, FRONTEND_URL } from './env/variable.env'
import connectDb from './config/db.config'

import UserRouter from './routers/user.router'
import MessageRouter from './routers/message.router'

import * as ConstantAPI from './constants/api.constant'

connectDb(DATABASE_URL)

const app = express()

//helmet
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res, next) => {
  res.status(200).json({
    API: 'Work',
  })
})

app.use(ConstantAPI.API_AUTH, UserRouter)
app.use(ConstantAPI.API_MESSAGES, MessageRouter)

export default app
