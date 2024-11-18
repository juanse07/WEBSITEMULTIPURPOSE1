
import * as yup from "yup";

export const requiredStringschema = yup.string()
.required("This field is required");


   
export const usernameSchema = yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required")
    .matches(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores");

    export const emailSchema = yup.string()
    .email("Invalid email");


export const passwordSchema = yup.string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(/^(?!.* )/, "Password cannot contain spaces");

export const slugSchema = yup.string()
    .matches(/^[a-zA-Z0-9_-]*$/,"No special characters allowed in slug");

export  const requiredFileSchema = yup.mixed<FileList>()
    .test(
        "not-empty-file-list",
        "File is Required",
        value => value instanceof FileList && value.length > 0
        
    )
    .required();
   