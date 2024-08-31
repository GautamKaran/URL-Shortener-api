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
    console.error("Error genareting ShortUrl", error);
    return res.status(500).json({
      error: `Something went wrong while genareting ShortUrl: ${error.message}`,
    });
  }
};

// shortid find and redirect that url
const shortIdFindAndRedirectURL = async (req, res) => {
  try {
    const { shortID } = req.params;

    if (!shortID) return res.status(400).json({ error: "shortID id required" });

    const entry = await URL.findOneAndUpdate(
      {
        shortID,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!entry) return res.status(404).json({ error: "ShortID not found" });

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(`Error during redirecting url : ${error}`);
    return res.status(500).json({
      error: `Something went wrong while redirecting url: ${error.message}`,
    });
  }
};

const Analytics = async (req, res) => {
  try {
    const { shortID } = req.params;
    if (!shortID) return res.status(400).json({ error: "shortID id required" });

    const result = await URL.findOne({ shortID });
    if (!result) return res.status(404).json({ error: "shortID not found!" });

    return res.json({
      shortID: result.shortID,
      originalURL: result.redirectURL,
      totalChicks: result.visitHistory.length,
    });
  } catch (error) {
    console.error(`Error during Analytics by shortID : ${error}`);
    return res.status(500).json({
      error: `Something went wrong while Analytics by shortID: ${error.message}`,
    });
  }
};

export { generateNewShortURl, shortIdFindAndRedirectURL, Analytics };
