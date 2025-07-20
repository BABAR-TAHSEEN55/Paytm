import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    UpdatedAt: Date;
    ComparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
UserSchema.pre("save", async function (next: any) {
    let user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    const Salt = await bcrypt.genSalt(config.get<number>("SALT"));
    const hashedPassword = await bcrypt.hash(this.password, Salt);
    user.password = hashedPassword;
    return next();
});
UserSchema.methods.ComparePassword = async function (
    candidatePassword: string,
): Promise<boolean> {
    let user = this as UserDocument;
    return await bcrypt
        .compare(candidatePassword, user.password)
        .catch(() => false);
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
