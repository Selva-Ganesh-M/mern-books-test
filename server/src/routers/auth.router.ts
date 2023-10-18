import express from "express";
import { authCtrl } from "../controllers/auth.ctrl";
import authorization from "../middleware/authorization";

const router = express.Router()

router.post("/signup", authCtrl.signup);

router.post("/login", authCtrl.login);

router.post("/logout", authorization, authCtrl.logout);

export const authRouter = router