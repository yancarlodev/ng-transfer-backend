import { Transactions } from "@prisma/client";
import { prisma } from "../../app";
import { IQueryParams } from "../../interfaces/transaction.interface";

export default async function getTransactionsService(id: string, queryParams: IQueryParams): Promise<Transactions[]> {
    const user = await prisma.users.findFirst({
        where: {
            id
        }
    })
    
    let transactions: Transactions[]

    if(queryParams['cash-outs-only'] === '') {
        transactions = await prisma.transactions.findMany({
            where: {
                debitedAccountId: user?.accountId
            }
        })
    } else if(queryParams['cash-ins-only'] === '') {
        transactions = await prisma.transactions.findMany({
            where: {
                creditedAccountId: user?.accountId
            }
        })
    } else {
        transactions = await prisma.transactions.findMany({
            where: {
                OR: [
                        {
                            debitedAccountId: user?.accountId
                        },
                        {
                            creditedAccountId: user?.accountId
                        },
                    ]
            }
        })
    }

    if(queryParams['order-by-time'] === '') {
        transactions = transactions.sort((currentTransaction, nextTransaction) => Number(nextTransaction.createdAt) - Number(currentTransaction.createdAt))
    }

    return transactions
}