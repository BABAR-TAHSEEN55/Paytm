import { Response } from "express";
import { CreateRecieve } from "../services/Receive.Service.ts";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import ReceiveModel from "../models/Receive.model.ts";
import mongoose from "mongoose";
import AccountModel from "../models/Account.model.ts";
import TransactionModel from "../models/Transaction.model.ts";

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
    const from = req.user?._id;

    if (!from) {
        res.status(400).send("Authorization is Required!");
        return;
    }

    const IncomingRequest = await ReceiveModel.find({
        to: from,
        status: "pending",
    }).populate("from", "username");

    const OutGoingRequest = await ReceiveModel.find({
        from,
        status: "pending",
    }).populate("to", "username");

    res.status(200).send({ IncomingRequest, OutGoingRequest });
};
export const ResponseToRequest = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    //
    // Starting a Session
    const to = req.user?._id;
    const Session = await mongoose.startSession();
    Session.startTransaction();
    const User = await ReceiveModel.findOne({
        to,
        status: "pending",
    }).session(Session);
    if (!User || User.amount == null) {
        await Session.abortTransaction();
        res.status(404).send("Request not found");
        return;
    }
    const amount = User.amount;
    const from = User?.from?._id;

    //This is inside The Mongoose Session
    const Account = await AccountModel.findOne({ UserId: to }).session(Session);

    if (!Account || Account.Balance < amount) {
        await Session.abortTransaction();
        return res
            .status(400)
            .json({ message: "Insufficient Balance | Account doesn't exist" });
    }
    const toAccount = await AccountModel.findOne({ UserId: from }).session(
        Session,
    );
    if (!toAccount) {
        await Session.abortTransaction();
        return res
            .status(400)
            .json({ message: "Invalid Account or Account doesn't exist" });
    }
    await AccountModel.updateOne(
        { UserId: to },
        {
            $inc: {
                Balance: -amount,
            },
        },
    ).session(Session);
    await AccountModel.updateOne(
        { UserId: from },
        {
            $inc: {
                Balance: amount,
            },
        },
    ).session(Session);

    await TransactionModel.create(
        {
            from: to,
            to: from,
            amount,
            status: "RECEIVE",
        },
        { session: Session },
    );
    await ReceiveModel.updateOne(
        {
            _id: User._id,
        },
        { $set: { status: "accepted" } },
        { session: Session },
    );

    await Session.commitTransaction();
    res.status(200).send("Transaction successfull!!!");
};
//TODO: :  1. User Glitching , 2. Avatar Random Color with Random char 3. Zod Check
