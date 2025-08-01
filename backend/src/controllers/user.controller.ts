import { Request, Response } from "express";
import { CreateUser } from "../services/User.Service.ts";
import UserModel from "../models/User.model.ts";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";

export const CreateUserHandler = async (
    req: AuthenticatedRequest,
    res: Response,
) => {
    try {
        const User = await CreateUser(req.body);
        if (!User) {
            res.status(400).send("Failed to Create User");
            return;
        }

        const { password: _, ...UserwithoutPassowrd } = User.toObject();
        res.send(UserwithoutPassowrd);
    } catch (error) {
        console.log("Error in User", error);
    }
};
export const BulkUser = async (req: Request, res: Response) => {
    const filter = req.query.filter || "";
    const BulkUser = await UserModel.find({
        $or: [
            {
                username: {
                    $regex: filter,
                },
            },
        ],
    });
    res.json({
        Users: BulkUser.map((user) => ({
            username: user.username,
            _id: user._id,
        })),
    });
};
