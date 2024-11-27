import express from "express";
import * as blogPostsController from "../controllers/blog-posts";
import { featuredImageUpload } from "../middlewares/imageUpload";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { createBlogPostSchema, deleteBlogPostSchema, getBlogPostsSchema,updateBlogPostSchema } from "../validation/blog-post";
import { createPostRateLimit, updatePostRateLimit } from "../middlewares/rate-limit";


const router = express.Router();

router.get("/", validateRequestSchema(getBlogPostsSchema), blogPostsController.getBlogPosts);
router.get("/slugs", blogPostsController.getallBlogPostSlugs);
// router.get("/:slug", blogPostsController.getBlogPostsBySlug);
router.get("/post/:slug", blogPostsController.getBlogPostBySlug);
//router.get("/blog/:slug", blogPostsController.getBlogPostBySlug);
router.post("/",requiresAuth,createPostRateLimit, featuredImageUpload.single("featuredImage"),validateRequestSchema(createBlogPostSchema),
 blogPostsController.createBlogPost);
router.patch("/:blogPostId",requiresAuth,updatePostRateLimit, featuredImageUpload.single("featuredImage"),validateRequestSchema(updateBlogPostSchema)
, blogPostsController.updateBlogPost);
router.delete("/:blogPostId",requiresAuth, validateRequestSchema(deleteBlogPostSchema),blogPostsController.deleteBlogPost);
export default router;