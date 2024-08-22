
import express from 'express';
import blogPostosRoutes from "./routes/blog-posts";
import cors from 'cors'; 
import env from './env';   
import morgan from 'morgan';



const app = express();
app.use(morgan('dev')); // This will log all incoming requests to the console
app.use(express.json());    // This middleware will parse incoming JSON requests
app.use(cors({
    origin: env.WEBSITE_URL,
}));
app.use("/posts", blogPostosRoutes);   // This will forward any requests starting with /posts to the blogPostsRoutes


export default app;
 