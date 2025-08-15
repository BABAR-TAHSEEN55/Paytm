import AccountModel, { AccountDocument } from "../models/Account.model.ts";

type AccountParams = Pick<AccountDocument, "Balance" | "UserId">;
export const CreateAccount = async (input: AccountParams) => {
    try {
        const Account = await AccountModel.create(input);
        console.log("Account created Successfully");
        return Account?.toJSON();
    } catch (error) {
        console.log("Error while creating Account ...", error);
    }
};
