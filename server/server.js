const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { app } = require("./app");

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.URI).catch((error) => handleError(error));

const db = mongoose.connection;

const startServer = () => {
  try {
    db.once("open", () => {
      console.log("Database connected to", process.env.URI);
    });

    db.on("error", (err) => {
      logError(err);
    });

    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express app running", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
