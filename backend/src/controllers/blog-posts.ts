import { RequestHandler } from "express";
import BlogPostModel from "../models/Blogposts"

export const getBlogPosts: RequestHandler = async(req, res, next) => {
    try {
        const allBlogPosts = await BlogPostModel.find().exec();
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

export const createBlogPost: RequestHandler<unknown, unknown, BlogPostbody, unknown> = async(req, res, next) => {
    const {slug, title, summary, body} = req.body;
    try {
        const newBlogPost = await BlogPostModel.create({
            slug,
            title,
            summary,
            body
        });
        
        res.status(201).json(newBlogPost);
       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error fetching blog posts", error});    
  
    }
}