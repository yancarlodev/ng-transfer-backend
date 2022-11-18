import { Request, Response } from "express";
import { ILoginRequest } from "../../interfaces/session.interface";
import loginService from "../../services/session/login.service";

export default async function loginController(req: Request, res: Response) {
    const loginData: ILoginRequest = req.validatedBody

    const token: string = await loginService(loginData)

    return res.status(200).json({ token })
}