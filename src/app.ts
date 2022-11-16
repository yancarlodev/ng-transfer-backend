import { PrismaClient } from '@prisma/client'
import express from 'express'
import 'dotenv/config'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}. Let's transform the financial lives of young people together!`)
})