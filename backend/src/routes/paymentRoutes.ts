import express from "express";

import { createCheckoutSession } from "../controllers/paymentController";
import { protect } from "./../controllers/authController";
const router = express.Router();

router.post("/checkout-session", protect, createCheckoutSession);

export default router;
