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

export const getCommentsRepliesSchema = yup.object({
    params: yup.object({
        
        commentPostId: objectIdSchema.required(),
    }),
    query: yup.object({
        
        continueAfterId: objectIdSchema,
    }),
    
});
export type GetCommentsRepliesParams = yup.InferType<typeof getCommentsRepliesSchema>[ 'params'];
export type GetCommentsRepliesQuery = yup.InferType<typeof getCommentsRepliesSchema>[ 'query'];

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

export const updateCommentSchema = yup.object({ 
    body: yup.object({
        
        newText: commentTextSchema,
    }),
    params: yup.object({
        
        commentId: objectIdSchema.required(),
    }),
})
export type UpdateCommentParams = yup.InferType<typeof updateCommentSchema>[ 'params'];
export type UpdateCommentBody = yup.InferType<typeof updateCommentSchema>[ 'body'];

export const deleteCommentsSchema = yup.object({
    params: yup.object({
        
        commentId: objectIdSchema.required(),
    }),
});
export type DeleteCommentParams = yup.InferType<typeof deleteCommentsSchema>[ 'params'];
