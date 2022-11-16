import { SchemaOf } from 'yup'
import { Request, Response, NextFunction } from 'express'
import { IRegisterRequest } from '../interfaces/session.interfaces'

const validateSerializer = (serializer: SchemaOf<IRegisterRequest>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await serializer.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })

        req.validatedBody = validatedBody

        return next()
    } catch (error: any) {
        return res.status(400).json({
            statusCode: 400,
            message: error.errors.join(', ')
        })
    }
} 

export default validateSerializer