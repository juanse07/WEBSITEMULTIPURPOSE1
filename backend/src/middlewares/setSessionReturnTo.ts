import { RequestHandler } from "express";
import env from "../env";
const successReturnToOrRedirect:RequestHandler = (req, res, next) => {
    const{returnTo} = req.query;
    if(returnTo){
        req.session.returnTo  = env.WEBSITE_URL + returnTo;
    }
    next();

}