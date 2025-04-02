import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userMode from "./models/user.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sample API Route
app.get("/", (req, res) => {
  res.send("API is running...");
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
