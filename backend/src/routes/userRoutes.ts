import express from "express";
import { signup, login, logout } from "./../controllers/authController";

const router = express.Router();

router.post("/registration", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
