import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async function validateAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Missing authorization headers'
        })
    }

    jwt.verify(token as string, process.env.SECRET_KEY as string, (error: jwt.VerifyErrors | null, decoded: any) => {
        if(error) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Invalid token'
            })
        }

        req.userId = decoded.sub

        next()
    })
}