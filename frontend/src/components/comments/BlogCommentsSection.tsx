import { set } from 'nprogress';
import {Comment as CommentModel} from '../../models/comment';   
import { useCallback, useEffect, useState } from "react";
import * as BlogApi from '../../network/api/blog';
import CreateCommentBox from './CreateCommentBox';
import Comment from './Comments';
import { Button, Spinner } from 'react-bootstrap';
import CommentThread from './CommentThread';

interface BlogCommentSectionProps {
    blogPostId: string;

}

export default function BlogCommentSection({blogPostId}: BlogCommentSectionProps) {
    return (
        <div>
            <h2>Comments</h2>
            <CommentSection blogPostId={blogPostId} key={blogPostId}/>

        </div>
    );
}

function CommentSection({blogPostId}: BlogCommentSectionProps) {
    const[comments, setcomments] = useState<CommentModel[]>([]);
    const[commentsloading, setCommentsLoading] = useState(false);
    const[commentsloadingError, setCommentsLoadingError] = useState(false);
    const[commentsEndOfPagination, setCommentsEndOfPagination] = useState<boolean>();

    
    
    const loadNextCommentsPage = useCallback(async function (continueAfterId?: string) {

        try {
            setCommentsLoading(true);
            setCommentsLoadingError(false); 
            const response = await BlogApi.getCommentsForBlogPost(blogPostId, continueAfterId);  
            if(!continueAfterId){
                setcomments(response.comments);
            }else{
                setcomments(existingComments=> [...existingComments, ...response.comments]);
            }
            setCommentsEndOfPagination(response.endOfPaginationReached);

        } catch (error) {

            console.error(error);
            setCommentsLoadingError(true);
        } finally{
            setCommentsLoading(false);
        }
    }, [blogPostId]);
    useEffect(() => {
        loadNextCommentsPage();

    }, [loadNextCommentsPage]);
    const handleCommmentCreated = (newComment: CommentModel) => {
        setcomments( [newComment, ...comments]);
    };
    function handleCommentUpdated(updatedComment: CommentModel){
        const update = comments.map(existingComment => 
            existingComment._id === updatedComment._id ? 
            {...updatedComment, repliesCount: existingComment.repliesCount} : existingComment);
           
        setcomments(update);

    }
    function handleCommentDeleted(deletedComment: CommentModel){
        const update = comments.filter(existingComment => existingComment._id !== deletedComment._id);
        setcomments(update);
    }
    return (
        <div>
           
            <CreateCommentBox
            blogPostId={blogPostId}
            title= "Write a comment"
            onCommentCreated={handleCommmentCreated}
            />
            {comments.map((comment) => (
                <CommentThread 
                key={comment._id} 
                comment={comment}
                onCommentUpdated={handleCommentUpdated}
                onCommentDeleted={handleCommentDeleted} />
            ))}
            <div className='mt-2 text-center'>
                <hr/>
                {commentsEndOfPagination && comments.length > 0 && <p>No more comments</p>}
                {commentsEndOfPagination && comments.length === 0 && <p>No one has posted comments yet</p>}

                {commentsloading && <Spinner animation="border"/>}
                {commentsloadingError && <p>Failed to load comments</p>}
                {!commentsloading && !commentsEndOfPagination &&
                <Button
                variant= "outline-primary"
                onClick={() => loadNextCommentsPage(comments[comments.length - 1]?._id)}>
                    show more comments</Button>}
            </div>
        </div>

    );
}