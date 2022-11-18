import { hashSync } from "bcryptjs";
import { prisma } from "../../app";
import AppError from "../../errors/AppError";
import { IRegisterRequest, IRegisterResponse } from "../../interfaces/session.interface";

export default async function registerService(registerData: IRegisterRequest): Promise<IRegisterResponse> {
    const userAlreadyExists = await prisma.users.findFirst({
        where: {
            username: registerData.username
        }
    })

    if(userAlreadyExists) {
        throw new AppError('Username already in use', 409)
    }

    const registerDataWithHashedPassword: IRegisterRequest = {
        ...registerData,
        password: hashSync(registerData.password, 10)
    }

    const registeredUser: IRegisterResponse = await prisma.users.create({
        data: {
            ...registerDataWithHashedPassword,
            account: {
                create: {
                    balance: '100.00'
                }
            }
        }
    })

    delete registeredUser.password

    return registeredUser
}