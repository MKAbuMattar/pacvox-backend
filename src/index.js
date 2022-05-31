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

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL)

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res, next) => {
  res.status(200).json({
    API: 'Work',
  })
})

app.use(ConstantAPI.API_AUTH, UserRouter)
app.use(ConstantAPI.API_MESSAGES, MessageRouter)

export default app
