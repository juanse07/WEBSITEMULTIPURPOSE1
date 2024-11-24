import { RequestHandler } from "express";
import BlogPostModel from "../models/Blogposts"
import assertIsDefined from "../utils/assertIsDefined";
import mongoose from "mongoose";
import sharp from "sharp";
import path from 'path';
import { fileURLToPath } from 'url';
import env from "../env";
import createHttpError from "http-errors";
import { BlogPostBody, GetBlogPostQuery } from "../validation/blog-post";


   


export const getBlogPosts: RequestHandler<unknown, unknown, unknown, GetBlogPostQuery> = async(req, res, next) => {
    const authorId = req.query.authorId;
    const page = parseInt(req.query.page || "1");
    const pageSize = 6;
    const filter =authorId ? {author: authorId} : { };// same author as in models/blogposts.ts
   
    try {
        const getBlogPostQuery =  BlogPostModel
        .find(filter)
        .sort({ _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("author")
        .exec();

        const countDocumentsQuery = await BlogPostModel.countDocuments(filter).exec();
        const [blogPosts, totalBlogPosts] = await Promise.all([getBlogPostQuery, countDocumentsQuery]);

        const totalPages = Math.ceil(totalBlogPosts / pageSize);

        // await new Promise(r=>setTimeout(r, 4000));
        res.status(200).json({
            blogPosts,
            page,
            totalPages,
        });
    } catch (error) {
      next(error);
        
    }

}

export const getallBlogPostSlugs: RequestHandler = async(req, res, next) => {
    try {
        const results = await BlogPostModel
        .find()
        .select("slug")
        .exec();
        const slugs = results.map(post => post.slug);
        res.status(200).json(slugs);
    } catch (error) {
        next(error);  
        
    }
    
}

export const getBlogPostBySlug: RequestHandler<{slug: string}> = async(req, res, next) => {    
    
    try {
        const blogPost = await BlogPostModel
        .findOne({slug: req.params.slug})
        .populate("author") 
        .exec();
if (!blogPost) {
        //   return  res.sendStatus(404).json({message: "Blog post not found"});
       // return res.sendStatus(404);
         throw createHttpError(404, "Blog post not found");   
        }
        res.status(200).json(blogPost);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        next(error);  
        
    }
}

export const createBlogPost: RequestHandler<unknown, unknown, BlogPostBody, unknown > = async(req, res, next) => {
    const {slug, title, summary, body} = req.body;
    const featuredImage = req.file;
    const uploadsPath = path.join(__dirname, '..', 'uploads', 'featured-images');
    const authenticatedUser = req.user;
   // console.log('Featured Image:', featuredImage);
    try {
        assertIsDefined (featuredImage);
        assertIsDefined(authenticatedUser);
        const existingSlug = await BlogPostModel.findOne({slug}).exec();

        if (existingSlug) {
            throw createHttpError(400, "Slug already exists");
        }
        
        const blogPostId = new mongoose.Types.ObjectId();
        console.log('Blog Post ID:', blogPostId);

        const featuredImageDestinationPath = "/uploads/featured-images/" + blogPostId + ".png";//original
        //const featuredImageDestinationPath = path.join(uploadsPath, blogPostId + ".png");
        console.log('Featured Image Destination Path:', featuredImageDestinationPath);

        await sharp(featuredImage.buffer)
            .resize(700, 450)
            .toFile("./" + featuredImageDestinationPath);
          

        const newBlogPost = await BlogPostModel.create({
            _id: blogPostId,
            slug,
            title,
            summary,
            body,
            featuredImageUrl: env.SERVER_URL + featuredImageDestinationPath,
            author: authenticatedUser._id,
        });
      //  console.log('New blog post:', newBlogPost);
console.log('Featured Image URL:', newBlogPost.featuredImageUrl); // Check if the schema includes featuredImageUrl
//console.log('Schema paths:', Object.keys(BlogPostModel.schema.paths));



        res.status(201).json(newBlogPost);
       
    } catch (error) {
        console.log(error);
        next(error); 
  
    }
}