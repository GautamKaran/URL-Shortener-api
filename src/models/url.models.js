import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
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
