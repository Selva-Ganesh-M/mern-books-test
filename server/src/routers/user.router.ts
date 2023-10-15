import express from "express";
import { userCtrl } from "../controllers/user.ctrl";

const router = express.Router();

router.get("/", userCtrl.getAllUsers)

router.post("/", userCtrl.createUser)

router.get("/:userId", userCtrl.getUser)

router.patch("/:userId", userCtrl.updateUser);

router.delete("/:userId", userCtrl.deleteUser);

export const userRouter = router;