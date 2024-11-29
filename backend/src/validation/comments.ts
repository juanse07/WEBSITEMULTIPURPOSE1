import * as yup from 'yup'
import { objectIdSchema } from '../utils/validation';

const commentTextSchema  = yup.string().required().max(300);

export const getCommentSchema= yup.object({
    params: yup.object({
        
        blogPostId: objectIdSchema.required(),
    }),
    query: yup.object({
        
        continueAfterId: objectIdSchema,
    }),
});

export type GetCommentsParams = yup.InferType<typeof getCommentSchema>[ 'params'];
export type GetCommentsQuery = yup.InferType<typeof getCommentSchema>[ 'query'];

export const createCommentSchema = yup.object({
    body: yup.object({
        
        parentCommentId: objectIdSchema,
        text: commentTextSchema,
    }),
    params: yup.object({
        
        blogPostId: objectIdSchema.required(),
    }),
});

export type CreateCommentParams = yup.InferType<typeof createCommentSchema>[ 'params'];
export type CreateCommentBody = yup.InferType<typeof createCommentSchema>[ 'body'];
