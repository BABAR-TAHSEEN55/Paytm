import ReceiveModel from "../models/Receive.model.ts";

export const CreateRecieve = async (input: any) => {
    try {
        const ReceiveRequest = await ReceiveModel.create(input);
        return ReceiveRequest;
    } catch (error) {
        console.log("Error while creating New Request", error);
    }
};
