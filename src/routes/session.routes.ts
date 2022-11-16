import { Router } from 'express'
import registerController from '../controllers/session/register.controller'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { registerSerializer } from '../serializers/session.serializer'

const router = Router()

router.post('/register', validateSerializer(registerSerializer), registerController)

export default router