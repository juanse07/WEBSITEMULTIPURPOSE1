import express from "express";
import * as blogPostsController from "../controllers/blog-posts";
import { featuredImageUpload } from "../middlewares/imageUpload";
import requiresAuth from "../middlewares/requiresAuth";
import validateRequestSchema from "../middlewares/validateRequestSchema";
import { createBlogPostSchema, deleteBlogPostSchema, getBlogPostsSchema,updateBlogPostSchema } from "../validation/blog-post";
import { createPostRateLimit, updatePostRateLimit } from "../middlewares/rate-limit";
import { createCommentSchema, deleteCommentsSchema, getCommentSchema,getCommentsRepliesSchema,updateCommentSchema } from "../validation/comments";
import * as CommentsController from "../controllers/comments";


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

router.get ("/:blogPostId/comments",validateRequestSchema(getCommentSchema), CommentsController.getCommentsForBlogPosts);

router.post("/:blogPostId/comments",requiresAuth,validateRequestSchema(createCommentSchema), CommentsController.createComment);

router.get("/comments/:commentPostId/replies",validateRequestSchema(getCommentsRepliesSchema), CommentsController.getCommentReplies);

router.patch("/comments/:commentId",requiresAuth,validateRequestSchema(updateCommentSchema), CommentsController.updateComment);

router.delete("/comments/:commentId",requiresAuth,validateRequestSchema(deleteCommentsSchema) ,CommentsController.deleteComment);

export default router;