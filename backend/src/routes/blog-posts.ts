import express from "express";
import * as blogPostsController from "../controllers/blog-posts";
import { featuredImageUpload } from "../middlewares/imageUpload";


const router = express.Router();

router.get("/", blogPostsController.getBlogPosts);
router.get("/slugs", blogPostsController.getallBlogPostSlugs);
// router.get("/:slug", blogPostsController.getBlogPostsBySlug);
router.get("/post/:slug", blogPostsController.getBlogPostBySlug);
//router.get("/blog/:slug", blogPostsController.getBlogPostBySlug);
router.post("/", featuredImageUpload.single("featuredImage"),
 blogPostsController.createBlogPost);

export default router;