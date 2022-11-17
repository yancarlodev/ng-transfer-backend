import { Router } from 'express'
import getBalanceController from '../controllers/transaction/getBalance.controller'
import validateAuthMiddleware from '../middlewares/validateAuth.middleware'

export const router = Router()

router.get('/balance', validateAuthMiddleware, getBalanceController)

export default router
