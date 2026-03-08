import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractRouter from "./routes/extract.js";

dotenv.config();

const app = express();

app.use(cors());

app.options(/.*/, cors());

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Smart Event Planner API is running" });
});

app.use("/extract", extractRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});