import { customAlphabet } from "nanoid";
import { URL } from "../models/url.models.js";

const generateNewShortURl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url)
      return res.status(404).json({
        error: "url is required",
      });

    // generate new shortID
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      4
    );
    const shortID = nanoid();
    if (!shortID)
      return res.status(501).json({
        message: "try-again",
      });

    const shortURLcreated = await URL.create({
      shortID: shortID,
      redirectURL: url,
    });

    res.status(201).json({ message: "ShortURL Generated", shortURLcreated });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        error: `Something went wrong while genareting ShortUrl: ${error.message}`,
      });
  }
};

export { generateNewShortURl };
