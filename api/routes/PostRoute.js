import express from "express"
import { addPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/PostController.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPostById)
router.post("/", addPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router