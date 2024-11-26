import * as yup from "yup";
import { imageFileSchema } from "../utils/validation";

 const usernameSchema = yup.string()
    .min(3)
    .max(30)  
    .matches(/^[a-zA-Z0-9_]*$/);

const emailSchema = yup.string()
    .email();

const passwordSchema = yup.string()
    .min(6) 
    .matches(/^(?!.* )/);



    export const signUpSchema = yup.object({
        body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),
        verificationCode: yup.string().required(),

        }),

    });

export type SignUpBody = yup.InferType<typeof signUpSchema>[
    'body'
];

export const updateUserSchema = yup.object({

    body:yup.object({
        username: usernameSchema,
        displayName: yup.string().max(30),
        about: yup.string().max(200),
        // email: emailSchema,
        // password: passwordSchema,
    }),
    file: imageFileSchema,

});
export type UpdateUserBody = yup.InferType<typeof updateUserSchema>['body'];

export const requestVerificationcODESchema = yup.object({
    body: yup.object({
        email: emailSchema.required(),
    }),
});

export type RequestVerificationCodeBody = yup.InferType<typeof requestVerificationcODESchema>['body'];