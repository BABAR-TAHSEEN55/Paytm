import { Request, Response } from "express";
import { ValidatePassword } from "../services/User.Service.ts";
import { CreateSession } from "../services/Session.Service.ts";
import { SignJWT } from "../utils/jwt.utils.ts";
import config from "config";

export const CreateSessionHandler = async (req: Request, res: Response) => {
    const ValidatedUser = await ValidatePassword(req.body);
    console.log(ValidatedUser);
    if (!ValidatedUser) {
        res.status(400).send({ message: "Invalid Email or Password" });
        return;
    }
    const Session = await CreateSession({
        UserId: ValidatedUser._id,
        UserAgent: req.get("user-agent") || "",
    });
    console.log(Session);

    const AccessToken = SignJWT(
        {
            ...ValidatedUser,
            Session: Session?._id,
        },
        { expiresIn: config.get("AccessTokenTTl") },
    );

    const RefreshToken = SignJWT(
        {
            ...ValidatedUser,
            Session: Session?._id,
        },
        { expiresIn: config.get("RefreshTokenTTl") },
    );
    res.send({ AccessToken, RefreshToken });
};
