import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: Number }],
  },
  { timestamps: true }
);

export const URL = mongoose.model("URL", urlSchema);
