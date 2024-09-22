import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import timeLineRouter from "./routes/timeLineRoutes.js";
import applicationRouter from "./routes/softwareApplicationRoutes.js";
import skillRouter from "./routes/skillRoutes.js";
import projectRouter from "./routes/projectRoutes.js";


const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// Define API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeLine", timeLineRouter);
app.use("/api/v1/softwareApplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

// Database connection
dbConnection(); 

// Error handling middleware
app.use(errorMiddleware);

export default app;
