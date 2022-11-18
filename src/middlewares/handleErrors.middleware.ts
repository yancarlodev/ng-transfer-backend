import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export default async function handleErrorsMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message
        })
    }
    console.log(error)
    return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error'
    })
}