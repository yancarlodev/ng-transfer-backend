import { prisma } from "../../app";

export default async function getBalanceService(id: string): Promise<string> {
    const user = await prisma.users.findFirst({
        where: {
            id
        }
    })
    
    const account = await prisma.accounts.findFirst({
        where: {
            user
        }
    })

    const balanceToNumber = Number(account?.balance)

    return balanceToNumber.toFixed(2)
}