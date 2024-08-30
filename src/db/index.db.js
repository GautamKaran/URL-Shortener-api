import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";

const connectDB = async () => {
  const DB_URL = process.env.MONGODB_URL;

  if (!DB_URL) {
    throw Error("MONGODB_URL env variable is not defined");
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${DB_URL}/${DATABASE_NAME}`
    );

    console.log(
      `\nMONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MONGODB Connection Failed !!! ", error);
  }
};

export default connectDB;
