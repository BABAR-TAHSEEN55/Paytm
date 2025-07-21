import SessionModel, { SessionDocument } from "../models/Session.model.ts";

type SessionParams = Pick<SessionDocument, "UserId" | "UserAgent">;
export const CreateSession = async (input: SessionParams) => {
    try {
        const Session = await SessionModel.create(input);
        return Session?.toJSON();
    } catch (error) {
        console.log("Error while creating a Session");
    }
};
