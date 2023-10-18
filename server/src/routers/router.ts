import express from "express"
import { userRouter } from "./user.router";
import { healthRouter } from "./health.router";
import { _404Router } from "./404.router";
import { authRouter } from "./auth.router";
import authorization from "../middleware/authorization";

const router = express.Router()

router.use("/users", userRouter);
router.use("/healthz", healthRouter);
router.use("/auth", authRouter);
router.use("/*", _404Router);

export default router;