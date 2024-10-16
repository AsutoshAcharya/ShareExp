import express from "express";
import { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./middlewares";
import userRoutes from "./routes/users";
mongoose.set("strictQuery", true);
dotenv.config();
const app: Express = express();

const connect = async () => {
  try {
    const mongo = process.env.mongo;
    if (!mongo) return;
    await mongoose.connect(mongo);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(Error("Endpoint not found"));
});
app.use(errorHandler);

app.listen(8800, () => {
  console.log("server started at port 8800");
  connect();
  console.log("connected to backend");
});
