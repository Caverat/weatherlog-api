require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const sensorsRouter = require("./routes/sensors");
const entryRouter = require("./routes/entries");
sensorsRouter.use("/:sensorId/entries", entryRouter);
app.use("/sensors", sensorsRouter);

app.listen(3000, () => console.log('server started, listening on port 3000'));