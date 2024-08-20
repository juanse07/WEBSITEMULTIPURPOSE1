import express from "express";
import * as blogPostsController from "../controllers/blog-posts";


const router = express.Router();

router.get("/", blogPostsController.getBlogPosts);
router.post("/", blogPostsController.createBlogPost);

export default router;