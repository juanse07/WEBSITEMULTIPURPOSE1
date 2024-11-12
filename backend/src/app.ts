
import express from 'express';
import blogPostsRoutes from "./routes/blog-posts";
import cors from 'cors'; 
import env from './env';   
import morgan from 'morgan';
import path from 'path';



const app = express();
const uploadsPath = path.join(__dirname, '..', 'uploads', 'featured-images');
//const uploadsPath = path.join('..', 'uploads', 'featured-images');
console.log('Static files path:', uploadsPath);
app.use(morgan('dev')); // This will log all incoming requests to the console
app.use(express.json());    // This middleware will parse incoming JSON requests
app.use(cors({
    origin: env.WEBSITE_URL,
}));
//app.use('/uploads/featured-images', express.static(path.join(__dirname, 'uploads', 'featured-images')));

//app.use("/uploads/featured-images", express.static("uploads/featured-images")); //this is the original
app.use('/uploads/featured-images', express.static(uploadsPath));
// This will serve the files in the uploads folder
console.log('Upload path:', uploadsPath);
app.use("/posts", blogPostsRoutes);   // This will forward any requests starting with /posts to the blogPostsRoutes


export default app;
 