import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.user) {
        next();
    }else{
    next(createHttpError(401, 'You must be logged in to access this resource'));

}

}
export default requiresAuth;