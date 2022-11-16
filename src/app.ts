import 'express-async-errors'
import 'dotenv/config'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import handleErrorsMiddleware from './middlewares/handleErrors.middleware'
import sessionRouter from './routes/session.routes'

export const prisma = new PrismaClient()
export const app = express()
app.use(express.json())

app.use('/session', sessionRouter)

app.use(handleErrorsMiddleware)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}. Let's transform the financial lives of young people together!`)
})