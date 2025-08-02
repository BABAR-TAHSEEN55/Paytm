import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import { CreateAccount } from "../services/Account.Service.ts";
import AccountModel from "../models/Account.model.ts";
import mongoose from "mongoose";
import TransactionModel from "../models/Transaction.model.ts";

export const CreateAccountHanlder = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const UserId = req.user?._id;
    if (!UserId) {
        res.status(400).send("Unauthorized");
        return;
    }
    const Account = await CreateAccount({
        UserId,
        Balance: 1 + Math.floor(Math.random() * 10000),
    });
    res.send(Account);
};
export const GetBalance = async (req: AuthenticatedRequest, res: Response) => {
    //Get the UserId
    const UserId = req.user?._id;
    console.log("User ID :", UserId);
    if (!UserId) {
        res.status(400).send("Unauthorized");
        return;
    }
    //Find the User
    const Account = await AccountModel.findOne({ UserId });
    console.log("Account : ", Account);
    if (!Account) {
        res.status(404).send("Account doesn't exists");
        return;
    }
    res.send({ Balance: Account.Balance });
};
export const Transaction = async (req: AuthenticatedRequest, res: Response) => {
    // Starting a Session
    const UserId = req.user?._id;
    const Session = await mongoose.startSession();
    Session.startTransaction();
    const { amount, to } = req.body;
    if (!amount || !to) {
        res.status(404).send("Missing amount or Recipient");
        return;
    }
    //This is inside The Mongoose Session
    const Account = await AccountModel.findOne({ UserId }).session(Session);
    if (!Account || Account.Balance < amount) {
        await Session.abortTransaction();
        return res
            .status(400)
            .json({ message: "Insufficient Balance | Account doesn't exist" });
    }
    const toAccount = await AccountModel.findOne({ UserId: to }).session(
        Session,
    );
    if (!toAccount) {
        await Session.abortTransaction();
        return res
            .status(400)
            .json({ message: "Invalid Account or Account doesn't exist" });
    }
    await AccountModel.updateOne(
        { UserId },
        {
            $inc: {
                Balance: -amount,
            },
        },
    ).session(Session);
    await AccountModel.updateOne(
        { UserId: to },
        {
            $inc: {
                Balance: amount,
            },
        },
    ).session(Session);

    await TransactionModel.create(
        {
            from: UserId,
            to,
            amount,
            status: "SUCCESS",
        },
        { session: Session },
    );
    await Session.commitTransaction();
    res.status(200).send("Transaction successfull!!!");
};
export const GetTransactionHistory = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    const UserId = req.user?._id;
    if (!UserId) {
        res.status(400).send("Unauthorized");
        return;
    }
    const TransactionHistory = await TransactionModel.find({
        $or: [
            {
                from: UserId,
            },
            { to: UserId },
        ],
    })
        .populate("from", "username")
        .populate("to", "username")
        .sort({ createdAt: -1 });

    res.send({ TransactionHistory });
};
