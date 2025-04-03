import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userMode from "./models/userModel.js";
import testModel from "./models/testModel.js";
import registerRouter from "./routes/registerRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/register", registerRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
