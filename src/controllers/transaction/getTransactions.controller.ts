import { Request, Response } from "express";
import getTransactionsService from "../../services/transaction/getTransactions.service";

export default async function getTransactionsController(req: Request, res: Response) {
    const { userId } = req

    const transactions = await getTransactionsService(userId, req.query)

    return res.status(200).json(transactions)
}