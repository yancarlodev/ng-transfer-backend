import { Request, Response } from "express";
import getBalanceService from "../../services/transaction/getBalance.service";

export default async function getBalanceController(req: Request, res: Response) {
    const { userId } = req

    const balance = await getBalanceService(userId)

    return res.status(200).json({ balance })
}