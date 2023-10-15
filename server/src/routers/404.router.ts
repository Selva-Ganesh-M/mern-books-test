import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response)=>{
    return res.status(400).json({
        message: "404 - router not found."
    })
})

export const _404Router = router;