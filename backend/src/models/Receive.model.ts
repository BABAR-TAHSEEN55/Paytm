import mongoose from "mongoose";

const RecieveSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: Number,
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true },
);

const ReceiveModel = mongoose.model("Receive", RecieveSchema);
export default ReceiveModel;
