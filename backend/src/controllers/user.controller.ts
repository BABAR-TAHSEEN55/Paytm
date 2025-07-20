import { Request, Response } from "express";
import { CreateUser } from "../services/User.Service.ts";

export const CreateUserHandler = async (req: Request, res: Response) => {
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
