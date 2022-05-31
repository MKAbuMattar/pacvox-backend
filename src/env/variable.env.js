import dotenv from 'dotenv'

dotenv.config()

export const { NODE_ENV } = process.env
export const { PORT } = process.env
export const { DATABASE_URL } = process.env
export const { FRONTEND_URL } = process.env

export default { NODE_ENV, PORT, DATABASE_URL, FRONTEND_URL }
