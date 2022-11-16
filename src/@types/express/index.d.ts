import * as express from "express"
import { IUserRequest, IUserLogin } from "../../interfaces/users"

declare global {
    namespace Express {
        interface Request {
            user: string,
            validatedBody: object
        }
    }
}