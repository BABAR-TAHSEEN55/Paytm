import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import { CreateAccount } from "../services/Account.Service.ts";

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
