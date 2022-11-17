import { Router } from 'express'
import doACashOutController from '../controllers/transaction/doACashOut.controller'
import getBalanceController from '../controllers/transaction/getBalance.controller'
import validateAuthMiddleware from '../middlewares/validateAuth.middleware'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { cashOutSerializer } from '../serializers/transaction.serializer'

export const router = Router()

router.get('/balance', validateAuthMiddleware, getBalanceController)
router.post('/cash-out', validateAuthMiddleware, validateSerializer(cashOutSerializer), doACashOutController)

export default router
