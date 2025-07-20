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
