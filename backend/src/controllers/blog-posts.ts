import { RequestHandler } from "express";
import BlogPostModel from "../models/Blogposts"
import assertIsDefined from "../utils/assertIsDefined";
import mongoose from "mongoose";
import sharp from "sharp";
import path from 'path';
import { fileURLToPath } from 'url';
import env from "../env";
// import dotenv from 'dotenv';
// dotenv.config(); 
 


export const getBlogPosts: RequestHandler = async(req, res, next) => {
    try {
        const allBlogPosts = await BlogPostModel
        .find()
        .sort({ _id: -1 })
        .exec();

        // await new Promise(r=>setTimeout(r, 4000));
        res.status(200).json(allBlogPosts);
    } catch (error) {
        res.status(500).json({message: "Error fetching blog posts", error});    
        
    }

}

interface BlogPostbody {
    slug: string;
    title: string;
    summary: string;    
    body: string; 
    

}

export const createBlogPost: RequestHandler<unknown, unknown, BlogPostbody, unknown > = async(req, res, next) => {
    const {slug, title, summary, body} = req.body;
    const featuredImage = req.file;
    console.log('Featured Image:', featuredImage);
    try {
        assertIsDefined (featuredImage);
        
        const blogPostId = new mongoose.Types.ObjectId();
        //const featuredImageDestinationPath = path.join(__dirname, 'uploads/featured-images', `${blogPostId}.png`);

        const featuredImageDestinationPath = "/uploads/featured-images/" + blogPostId + ".png";
        console.log('Featured Image Destination Path:', featuredImageDestinationPath);

        await sharp(featuredImage.buffer)
            .resize(800, 400)
            .toFile("./" + featuredImageDestinationPath);

        const newBlogPost = await BlogPostModel.create({
            _id: blogPostId,
            slug,
            title,
            summary,
            body,
            featuredImage: env.SERVER_URL + featuredImageDestinationPath,
        });
        console.log('New blog post:', newBlogPost);
console.log('Featured Image URL:', newBlogPost.featuredImage);

// Check if the schema includes featuredImageUrl
console.log('Schema paths:', Object.keys(BlogPostModel.schema.paths));



        res.status(201).json(newBlogPost);
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching blog posts", error});    
  
    }
}