import "dotenv/config"; // This will read the .env file and add the values to the process.env object
import express from 'express';
import usersroutes from './routes/users';
import blogPostsRoutes from "./routes/blog-posts";
import cors from 'cors'; 
import env from './env';   
import morgan from 'morgan';
import path from 'path';
import errorHandler from './middlewares/errorHandler';
import createHttpError from 'http-errors';
import session from 'express-session';
import sessionConfig from './config/session';
import passport from 'passport';
import './config/passport';

const app = express();
const uploadsPath = path.join(__dirname, '..', 'uploads', 'featured-images');
//const uploadsPath = path.join('..', 'uploads', 'featured-images');
console.log('Static files path:', uploadsPath);
app.use(morgan('dev')); // This will log all incoming requests to the console
app.use(express.json());    // This middleware will parse incoming JSON requests
app.use(cors({
    origin: env.WEBSITE_URL,
    credentials: true
}));

app.use(session(sessionConfig));
app.use(passport.authenticate("session"));

// This will allow requests from the frontend to the backend
//app.use("/uploads/featured-images", express.static("uploads/featured-images")); //this is the original
app.use('/uploads/featured-images', express.static(uploadsPath));
// This will serve the files in the uploads folder
console.log('Upload path:', uploadsPath);
app.use("/posts", blogPostsRoutes);   // This will forward any requests starting with /posts to the blogPostsRoutes
app.use("/users", usersroutes);   // This will forward any requests starting with /users to the usersRoutes
app.use((req, res, next) => next(createHttpError(404, "End point Not found")));
app.use(errorHandler);


export default app;
 