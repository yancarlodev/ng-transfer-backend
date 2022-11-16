import { Router } from 'express'
import loginController from '../controllers/session/login.controller'
import registerController from '../controllers/session/register.controller'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { loginSerializer, registerSerializer } from '../serializers/session.serializer'

const router = Router()

router.post('/register', validateSerializer(registerSerializer), registerController)
router.post('/login', validateSerializer(loginSerializer), loginController)

export default router