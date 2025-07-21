import mongoose from "mongoose";
import { UserDocument } from "./User.model.ts";
import { mongo } from "mongoose";

export interface SessionDocument extends mongoose.Document {
    UserId: UserDocument["_id"];
    valid: boolean;
    UserAgent: string;
    createdAt: Date;
    updatedAt: Date;
}
const SessionSchema = new mongoose.Schema(
    {
        UserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        valid: {
            type: Boolean,
            default: true,
        },
        UserAgent: {
            type: String,
        },
    },
    { timestamps: true },
);
const SessionModel = mongoose.model("Session", SessionSchema);
export default SessionModel;
