import express from "express";
import { authorCtrl } from "../controllers/author.ctrl"

const router = express.Router();

router.get("/", authorCtrl.getAllAuthors)

router.post("/", authorCtrl.createAuthor)

router.get("/:authorId", authorCtrl.getAuthor)

router.patch("/:authorId", authorCtrl.updateAuthor);

router.delete("/:authorId", authorCtrl.deleteAuthor);

export const authorRouter = router;