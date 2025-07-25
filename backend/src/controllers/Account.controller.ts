import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import { CreateAccount } from "../services/Account.Service.ts";
import AccountModel from "../models/Account.model.ts";

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
        Balance: 1 + Math.random() + 10000,
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
    //Findin the User
    const Account = await AccountModel.findOne({ UserId });
    console.log("Account : ", Account);
    if (!Account) {
        res.status(404).send("Account doesn't exists");
        return;
    }
    res.send({ Balance: Account.Balance });
};
