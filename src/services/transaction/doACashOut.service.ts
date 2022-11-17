import { prisma } from "../../app";
import AppError from "../../errors/AppError";
import { ICashOutRequest } from "../../interfaces/transaction.interface";

export default async function doACashOutService(id: string, doACashOutData: ICashOutRequest): Promise<string> {
    const userToCashOut = await prisma.users.findFirst({
        where: {
            id
        },
        include: {
            account: true
        }
    })

    if(userToCashOut?.username === doACashOutData.username) {
        throw new AppError('Cannot cash-out to yourself', 400)
    }

    if(Number(userToCashOut?.account.balance) < Number(doACashOutData.value)) {
        throw new AppError('Insufficient funds', 400)
    }

    const userToCashIn = await prisma.users.findFirst({
        where: {
            username: doACashOutData.username
        },
        include: {
            account: true
        }
    })

    if(!userToCashIn) {
        throw new AppError('User not found', 400)
    }

    const newUserCashOutBalance = (Number(userToCashOut?.account.balance) - Number(doACashOutData.value)).toFixed(2)

    const cashOutAccount = await prisma.accounts.update({
        where: {
            id: userToCashOut?.accountId
        },
        data: {
            balance: newUserCashOutBalance
        }
    })

    const newUserCashInBalance = (Number(userToCashIn.account.balance) + Number(doACashOutData.value)).toFixed(2)

    const cashInAccount = await prisma.accounts.update({
        where: {
            id: userToCashIn?.accountId
        },
        data: {
            balance: newUserCashInBalance
        }
    })

    await prisma.transactions.create({
        data: {
            debitedAccountId: cashOutAccount.id,
            creditedAccountId: cashInAccount.id,
            value: doACashOutData.value
        }
    })

    return userToCashIn.username
}