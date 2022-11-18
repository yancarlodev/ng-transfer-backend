import { Request, Response } from 'express'
import { IRegisterRequest, IRegisterResponse } from '../../interfaces/session.interface'
import registerService from '../../services/session/register.service'

export default async function registerController(req: Request, res: Response) {
    const registerData: IRegisterRequest = req.validatedBody

    const registeredUser: IRegisterResponse = await registerService(registerData)

    return res.status(201).json(registeredUser)
}