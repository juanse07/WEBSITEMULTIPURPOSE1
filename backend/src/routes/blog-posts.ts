import express from "express";
import * as blogPostsController from "../controllers/blog-posts";
import { featuredImageUpload } from "../middlewares/imageUpload";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { createBlogPostSchema } from "../validation/blog-post";


const router = express.Router();

router.get("/", blogPostsController.getBlogPosts);
router.get("/slugs", blogPostsController.getallBlogPostSlugs);
// router.get("/:slug", blogPostsController.getBlogPostsBySlug);
router.get("/post/:slug", blogPostsController.getBlogPostBySlug);
//router.get("/blog/:slug", blogPostsController.getBlogPostBySlug);
router.post("/",requiresAuth, featuredImageUpload.single("featuredImage"),validateRequestSchema(createBlogPostSchema),
 blogPostsController.createBlogPost);

export default router;