import { Request, RequestParamHandler, Response } from "express";
import { CreateRecieve } from "../services/Receive.Service.ts";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import ReceiveModel from "../models/Receive.model.ts";

export const ReceiveHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const from = req.user?._id;
    const { to, amount } = req.body;
    if (!to || !amount) {
        res.status(400).send("Amount and To Id Is required");
        return;
    }
    const Request = await CreateRecieve({ ...req.body, from });
    res.status(200).send({ Request });
};

export const GetAllRequests = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const to = req.user?._id;
    const IncomingRequest = await ReceiveModel.find({
        to,
        status: "pending",
    }).populate("from", "username");
    res.status(200).send(IncomingRequest);
};
