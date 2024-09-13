import express from "express";
import * as blogPostsController from "../controllers/blog-posts";
import { featuredImageUpload } from "../middlewares/imageUpload";


const router = express.Router();

router.get("/", blogPostsController.getBlogPosts);
router.post("/", featuredImageUpload.single("featuredImage"),
 blogPostsController.createBlogPost);

export default router;