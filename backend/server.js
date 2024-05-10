import express from "express";
import dotenv from "dotenv";
import color from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./server/db/db.js";

import authRouter from "./server/routes/authRouter.js";
import userRouter from "./server/routes/userRouter.js";
import itemRouter from './server/routes/itemRouter.js'
import adminRouter from './server/routes/adminRouter.js';

import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/items', itemRouter)
app.use('/api/admin', adminRouter)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
      .underline
  )
);
