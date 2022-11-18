import { compareSync } from "bcryptjs";
import { prisma } from "../../app";
import AppError from "../../errors/AppError";
import { ILoginRequest } from "../../interfaces/session.interface";
import jwt from 'jsonwebtoken'

export default async function loginService(loginData: ILoginRequest): Promise<string> {
    const { username, password } = loginData

    const user = await prisma.users.findFirst({
        where: {
            username
        }
    })

    const passwordMatch = compareSync(password, user?.password! || '')

    if(!user || !passwordMatch) {
        throw new AppError('Email or password invalid', 403)
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { subject: user.id, expiresIn: '24h' })

    return token
}