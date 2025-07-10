import express from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config({
  path: "../.env",
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at port : ${process.env.PORT}`);
});
