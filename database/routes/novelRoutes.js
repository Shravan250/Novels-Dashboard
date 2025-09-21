import express from "express";
import {
  getNovels,
  getNovel,
  createNovel,
  updateNovel,
  deleteNovel,
} from "../controllers/novelController.js";

const router = express.Router();

router.get("/", getNovels); // GET all novels
router.get("/:id", getNovel); // GET one novel
router.post("/", createNovel); // POST new novel
router.put("/:id", updateNovel); // PUT update novel
router.delete("/:id", deleteNovel); // DELETE novel

export default router;
