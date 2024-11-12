import { ErrorRequestHandler } from "express"
import { isHttpError } from "http-errors";
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);
    let status = 500;
    let message = "Something went wrong";
    if (isHttpError(error)) {
        status = error.statusCode;
        message = error.message;
    }
    res.status(status).json({message});

}
export default errorHandler;