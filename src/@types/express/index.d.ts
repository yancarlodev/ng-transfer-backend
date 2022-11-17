import * as express from "express"
import { ILoginRequest, IRegisterRequest } from "../../interfaces/session.interface"
import { IUserRequest, IUserLogin } from "../../interfaces/users"

declare global {
    namespace Express {
        interface Request {
            userId: string,
            validatedBody: IRegisterRequest | ILoginRequest
        }
    }
}