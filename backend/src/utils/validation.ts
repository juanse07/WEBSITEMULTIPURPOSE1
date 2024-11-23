import mongoose from "mongoose";
import { validateBufferMIMEType } from "validate-image-type";
import * as yup from "yup";

export const imageFileSchema = yup.mixed<Express.Multer.File>()
.test(
    "valid-image-file",
    "Invalid image file",

    async file => {
        if(!file) return true;
        const result = await validateBufferMIMEType(file.buffer, {
            allowMimeTypes: ["image/jpeg", "image/png"] // Add more mime types as needed
        });

        return result.ok;
    } 
);

export const objectIdSchema =yup.string()
.test(
    "valid-object-id",
    "${path} is not a valid object ID",
    value => !value || mongoose.Types.ObjectId.isValid(value),
       
    
);