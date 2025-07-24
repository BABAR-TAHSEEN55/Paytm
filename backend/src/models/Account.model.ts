import mongoose from "mongoose";
import { UserDocument } from "./User.model.ts";

export interface AccountDocument extends mongoose.Document {
    UserId: UserDocument["_id"];
    Balance: number;
    createdAt: Date;
    updatedAt: Date;
}

const AccountSchema = new mongoose.Schema<AccountDocument>(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        Balance: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

const AccountModel = mongoose.model("Account", AccountSchema);
export default AccountModel;
