import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["SUCCESS", "FAILURE", "RECEIVE"],
            default: "SUCCESS",
        },
    },
    { timestamps: true },
);
const TransactionModel = mongoose.model("Transaction", TransactionSchema);
export default TransactionModel;
