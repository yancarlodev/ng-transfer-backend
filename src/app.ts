import 'express-async-errors'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import handleErrorsMiddleware from './middlewares/handleErrors.middleware'
import sessionRouter from './routes/session.routes'

export const prisma = new PrismaClient()
export const app = express()
app.use(express.json())

app.use('/session', sessionRouter)

app.use(handleErrorsMiddleware)