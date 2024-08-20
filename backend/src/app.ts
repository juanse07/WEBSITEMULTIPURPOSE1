
import express from 'express';
import blogPostosRoutes from "./routes/blog-posts";


const app = express();

app.use(express.json());    // This middleware will parse incoming JSON requests
app.use("/posts", blogPostosRoutes);   // This will forward any requests starting with /posts to the blogPostsRoutes



export default app;
