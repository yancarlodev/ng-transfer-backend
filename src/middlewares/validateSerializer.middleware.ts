import { SchemaOf } from 'yup'
import { Request, Response, NextFunction } from 'express'

const validateSerializer = (serializer: SchemaOf<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await serializer.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })

        req.validatedBody = validatedBody

        return next()
    } catch (error: any) {
        return res.status(error.statusCode).json({
            message: error.errors.join(', ')
        })
    }
} 

export default validateSerializer