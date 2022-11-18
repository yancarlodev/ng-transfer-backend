import { Request, Response } from "express";
import { ICashOutRequest } from "../../interfaces/transaction.interface";
import doACashOutService from "../../services/transaction/doACashOut.service";

export default async function doACashOutController(req: Request, res: Response) {
    const { userId } = req
    const doACashOutData: ICashOutRequest = req.validatedBody

    const receiver = await doACashOutService(userId, doACashOutData)

    return res.status(200).json({
        message: `Cash-out done successfully to ${receiver}`
    })
}