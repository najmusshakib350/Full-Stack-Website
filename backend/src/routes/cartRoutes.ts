import express from "express";
import { creatCartItem, getCartItem } from "./../controllers/cartController";
import { protect } from "./../controllers/authController";

const router = express.Router();

router.get("/", protect, getCartItem);
router.post("/add", protect, creatCartItem);

export default router;
