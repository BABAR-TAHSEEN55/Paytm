import { Request, Response } from "express";
import { CreateUser } from "../services/User.Service.ts";
import UserModel from "../models/User.model.ts";
import { AuthenticatedRequest } from "../middlewares/DeserializeUser.ts";
import { UserSchemaType, UserSchema } from "../schema/user.schema.ts";

export const CreateUserHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  // const ValidateReq = UserSchema
  const ValidateResult = UserSchema.safeParse(req.body);
  if (!ValidateResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: ValidateResult.error,
    });
  }
  const ValidatedData: UserSchemaType = ValidateResult.data;

  try {
    const User = await CreateUser(ValidatedData);
    if (!User) {
      res.status(400).send("Failed to Create User");
      return;
    }

    const { password: _, ...UserwithoutPassowrd } = User.toObject();
    res.send(UserwithoutPassowrd);
  } catch (error) {
    console.log("Error in User", error);
  }
};
export const BulkUser = async (req: AuthenticatedRequest, res: Response) => {
  const filter = req.query.filter || "";
  const LoggedInUser = req.user?._id;
  const BulkUser = await UserModel.find({
    $and: [
      {
        _id: {
          $ne: LoggedInUser,
        },
      },
      {
        username: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    Users: BulkUser.map((user) => ({
      username: user.username,
      _id: user._id,
    })),
  });
};
export const ListUserDetails = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const UserId = req.user?._id;
  console.log("USerId in the List", UserId);

  const GetDetails = await UserModel.findById(UserId);
  console.log(GetDetails)
  res.status(200).send({ GetDetails });
};
