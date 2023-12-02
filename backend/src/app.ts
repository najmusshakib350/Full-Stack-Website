import express from "express";
import userRouter from "./routes/userRoutes";
import cartRouter from "./routes/cartRoutes";
import paymentRouter from "./routes/paymentRoutes";
import globalError from "./controllers/errController";
import { webHookCheckout } from "./controllers/paymentController";
const cookieParser = require("cookie-parser");
import cors from "cors";
const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webHookCheckout
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payment", paymentRouter);
app.use(globalError);
export default app;
