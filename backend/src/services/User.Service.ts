import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/User.model.ts";

type UserParams = Pick<UserDocument, "email" | "username" | "password">;
export const CreateUser = async (input: UserParams) => {
    try {
        const ExisitingUser = await UserModel.findOne({ email: input.email });
        if (ExisitingUser) {
            console.log("User Already Exists");
            return;
        }
        const User = await UserModel.create(input);
        return User;
    } catch (error) {
        console.log("Error while creating User", error);
    }
};
export const ValidatePassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const User = await UserModel.findOne({ email });
    if (!User) {
        console.log("User doesn't Exists");
        return false;
    }
    const IsValid = await User.ComparePassword(password);
    if (!IsValid) {
        return false;
    }
    return omit(User?.toJSON(), "password");
};
