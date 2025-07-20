import mongoose from "mongoose";
import config from "config";

const url = config.get<string>("DBURL");
export const ConnectionDB = async () => {
    await mongoose
        .connect(url)
        .then(() => console.log("DB connected successfully"))
        .catch((err) => console.log("Error while connecting to DB", err));
};
