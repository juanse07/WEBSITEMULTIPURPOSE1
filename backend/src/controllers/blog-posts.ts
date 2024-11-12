import { RequestHandler } from "express";
import BlogPostModel from "../models/Blogposts"
import assertIsDefined from "../utils/assertIsDefined";
import mongoose from "mongoose";
import sharp from "sharp";
import path from 'path';
import { fileURLToPath } from 'url';
import env from "../env";

//import { addAbortSignal } from "nodemailer/lib/xoauth2";
   


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

export const getallBlogPostSlugs: RequestHandler = async(req, res, next) => {
    try {
        const results = await BlogPostModel
        .find()
        .select("slug")
        .exec();
        const slugs = results.map(post => post.slug);
        res.status(200).json(slugs);
    } catch (error) {
        res.status(500).json({message: "Error fetching blog posts", error});    
        
    }
    
}

export const getBlogPostBySlug: RequestHandler<{slug: string}> = async(req, res, next) => {    
    
    try {
        const blogPost = await BlogPostModel
        .findOne({slug: req.params.slug})
        .exec();
if (!blogPost) {
        //   return  res.sendStatus(404).json({message: "Blog post not found"});
        return res.sendStatus(404);
            
        }
        res.status(200).json(blogPost);
    } catch (error) {
        console.error('Error fetching blog post:', error);
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
    const uploadsPath = path.join(__dirname, '..', 'uploads', 'featured-images');
   // console.log('Featured Image:', featuredImage);
    try {
        assertIsDefined (featuredImage);
        
        const blogPostId = new mongoose.Types.ObjectId();
        console.log('Blog Post ID:', blogPostId);

        const featuredImageDestinationPath = "/uploads/featured-images/" + blogPostId + ".png";//original
        //const featuredImageDestinationPath = path.join(uploadsPath, blogPostId + ".png");
        console.log('Featured Image Destination Path:', featuredImageDestinationPath);

        await sharp(featuredImage.buffer)
            .resize(700, 450)
            .toFile("./" + featuredImageDestinationPath);
           // .toFile(featuredImageDestinationPath);

        const newBlogPost = await BlogPostModel.create({
            _id: blogPostId,
            slug,
            title,
            summary,
            body,
            featuredImageUrl: env.SERVER_URL + featuredImageDestinationPath,
        });
      //  console.log('New blog post:', newBlogPost);
console.log('Featured Image URL:', newBlogPost.featuredImageUrl); // Check if the schema includes featuredImageUrl
//console.log('Schema paths:', Object.keys(BlogPostModel.schema.paths));



        res.status(201).json(newBlogPost);
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching blog posts", error});    
  
    }
}