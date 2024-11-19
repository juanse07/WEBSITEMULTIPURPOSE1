import * as yup from "yup";

 const usernameSchema = yup.string()
    .min(3)
    .max(30)
    .required()
    .matches(/^[a-zA-Z0-9_]*$/);

const emailSchema = yup.string()
    .email();

const passwordSchema = yup.string()
    .min(6)
    .required()
    .matches(/^(?!.* )/);

    export const signUpSchema = yup.object({
        body: yup.object({
        username: usernameSchema.required(),
        email: emailSchema.required(),
        password: passwordSchema.required(),

        }),

    });

export type SignUpBody = yup.InferType<typeof signUpSchema>[
    'body'
];
