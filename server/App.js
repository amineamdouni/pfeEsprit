import express, { urlencoded } from "express";
import {config}  from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./routes/messageRouer.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
import studentRouter from "./routes/userRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import jobRouter from "./routes/jobRouter.js";



const app= express();
config({ path: "./config/config.env" });
app.use (cors ({
    
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
      }));
     

      app.use(cookieParser());
      app.use(express.json());
      app.use(urlencoded( {extended:true}));



app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", studentRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/job", jobRouter);



      dbConnection();
app.use (errorMiddleware)
export default app;