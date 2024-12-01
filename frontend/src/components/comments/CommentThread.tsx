import {Comment as CommentModel} from "@/models/comment";
import { useState } from "react";
import * as BlogApi from "@/network/api/blog";
import { set } from "nprogress";
import Comments from "./Comments";
import { Button, Spinner } from "react-bootstrap";

interface CommentThreadProps {
    comment:CommentModel,
    onCommentUpdated: (updatedComment: CommentModel) => void;
    onCommentDeleted: (deletedComment: CommentModel) => void;
}


export default function CommentThread({comment, onCommentUpdated, onCommentDeleted}: CommentThreadProps){
    const [replies, setReplies] =useState<CommentModel[]>([]);
    const [repliesLoading, setRepliesLoading] = useState(false);
    const [repliesLoadingError, setRepliesLoadingError] = useState(false);
    const [repliesEndOfPagination, setRepliesEndOfPagination] = useState<boolean>();

    const[localReplies, setLocalReplies]= useState<CommentModel[]>([]);

    
   async function loadNextRepliespage(){
        const continueAfterId = replies[replies.length - 1]?._id;
        try {
            setRepliesLoading(true);
            setRepliesLoadingError(false);
            const response = await BlogApi.getRepilesForComment(comment._id, continueAfterId);
            setReplies([...replies, ...response.comments]);
            setRepliesEndOfPagination(response.endOfPaginationReached);
            setLocalReplies([]);
            
        } catch (error) {
            console.error(error);
            setRepliesLoadingError(true);
        }finally{
            setRepliesLoading(false);
        }   
    } 

    function handleReplyCreated(reply: CommentModel){
        setLocalReplies([...localReplies, reply]);
    
    }
    function handleRemoteReplyUpdated(updatedReply: CommentModel){
        const update = replies.map(existingReply => existingReply._id === updatedReply._id ? updatedReply : existingReply);
        setReplies(update);
    }
    function handleRemoteReplyDeleted(deletedReply: CommentModel){
        const update = replies.filter(reply => reply._id !== deletedReply._id);
        setReplies(update);

    }
    function handleLocalReplyUpdated(updatedReply:CommentModel){
        const update = localReplies.map(existingReply => existingReply._id === updatedReply._id ? updatedReply : existingReply);
        setLocalReplies(update);
        
        

    }
    function handleLocalReplyDeleted(deletedReply:CommentModel){
        const update = localReplies.filter(reply => reply._id !== deletedReply._id);
        setLocalReplies(update);
    }

    const showLoadRepliesButton = !!comment.repliesCount && !repliesEndOfPagination && !repliesLoadingError;

    return(
        <div>
            <Comments
            comment={comment}
            onReplieCreated={handleReplyCreated}
            onCommentUpdated={onCommentUpdated}
            onCommentDeleted={onCommentDeleted}
            />
            <Replies
            replies={replies}
            onRelpyCreated={handleReplyCreated}
            onReplyUpdated={handleRemoteReplyUpdated}
            onReplyDeleted={handleRemoteReplyDeleted}/>
            <div className="mt-2 text-center">
               {repliesLoading && <Spinner animation="border" />}
               {repliesLoadingError && <p>Failed to load replies</p>}
                {showLoadRepliesButton && 
                     <Button
                     variant="outline-primary"
                     onClick={loadNextRepliespage}
                     disabled={repliesLoading}
                     >
                          {repliesEndOfPagination === undefined
                          ? `Show ${comment.repliesCount} ${comment.repliesCount === 1 ? "reply" : "replies"}`
                            : "show more replies"
                            }
                     </Button>
                    
                }
                <Replies
                replies={localReplies}
                onRelpyCreated={handleReplyCreated}
                onReplyUpdated={handleLocalReplyUpdated}
                onReplyDeleted={handleLocalReplyDeleted}>

                </Replies>
            </div>
        </div>
                
    );

}
interface RepliesProps {
    replies: CommentModel[];
    onRelpyCreated: (reply: CommentModel) => void;
    onReplyUpdated: (updatedReply: CommentModel) => void;
    onReplyDeleted: (deletedReply: CommentModel) => void;
}
function Replies ({replies, onRelpyCreated, onReplyUpdated, onReplyDeleted}: RepliesProps){
    return(
        <div className= "ms-5">
            {replies.map(reply => (
                <Comments
                key={reply._id}
                comment={reply}
                onReplieCreated={onRelpyCreated}
                onCommentUpdated={onReplyUpdated}
                onCommentDeleted={onReplyDeleted}
                />
            ))}

        </div>
    );

}