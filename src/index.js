import "dotenv/config";
import connectDB from "./db/index.db.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection Failed :: ", error);
    process.exit(1);
  });
