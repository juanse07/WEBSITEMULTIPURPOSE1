import { formatRelativeDate } from '@/utils/utils';
import { Comment as CommentModel} from '../../models/comment';
import UserProfileLink from '../UserProfileLink';
import EditcommentBox from './EditCommentsBox';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { useContext, useState } from 'react';
import { AuthModalsContext } from '../auth/AuthModalsProvider';
import { Button } from 'react-bootstrap';
import CreateCommentBox from './CreateCommentBox';
import { NotFoundError } from '@/network/api/http-errors';
import * as BlogApi from '@/network/api/blog';

interface CommentProps {
    comment: CommentModel;
    onReplieCreated: (reply: CommentModel) => void;
    onCommentUpdated: (reply: CommentModel) => void;
    onCommentDeleted: (reply: CommentModel) => void;

}

export default function Comment({comment,onReplieCreated,onCommentDeleted,onCommentUpdated}: CommentProps) {
const {user}= useAuthenticatedUser();
const authModalContext = useContext(AuthModalsContext);

const [showeditBox, setShowEditBox] = useState(false);
const [showReplyBox, setShowReplyBox] = useState(false);
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

function handleReplyClicked(){
    if(!user){
        authModalContext.showLoginModal();
        return;
    }
    setShowReplyBox(true);
}

function handleEditClicked(){
    setShowEditBox(true);
    setShowDeleteConfirmation(false);
}

function handleReplyCreated(newReply: CommentModel){
    onReplieCreated(newReply);
    setShowReplyBox(false); 
}

function handleCommentUpdated(updatedComment: CommentModel){
    onCommentUpdated(updatedComment);
    setShowEditBox(false);
}


    return (
    <div >
        <hr/>
       {showeditBox ? <EditcommentBox 
       comment={comment} 
       onCommentUpdate={handleCommentUpdated} 
       onCancel={()=> setShowEditBox(false)}/> :
       <CommentLayout
       comments={comment}
       onReplyClicked={handleReplyClicked}
       onEditClicked={handleEditClicked}
       onDeleteClicked={()=> setShowDeleteConfirmation(true)}/> 

       }
         {showReplyBox && (
              <CreateCommentBox
              blogPostId={comment.blogPostId}
              title="write a reply"
              onCommentCreated={handleReplyCreated}
              parentCommentId={comment.parentCommentId ?? comment._id}
              showCancel
              onCancel={()=> setShowReplyBox(false)}
              defaultText={comment.parentCommentId ? `@${comment.author.username} `:""}/>
         )}
       
        {showDeleteConfirmation && <DeleteConfirmation
        comment={comment}
        onCommentDeleted={onCommentDeleted}
        onCancel={()=>setShowDeleteConfirmation(false)}/>}
          
    </div>    
    ); 
}

interface CommentLayoutProps {
    comments: CommentModel;
    onReplyClicked: () => void;
    onEditClicked: () => void;
    onDeleteClicked: () => void;
}

function CommentLayout({comments, onReplyClicked,onEditClicked,onDeleteClicked}: CommentLayoutProps) {
    const{user}= useAuthenticatedUser();
    const loggedInUserIsAuthor = (user && user._id === comments.author._id) || false;
    return (
        <div className='p-3'>
            <div className='mb-2  whitespace-pre-wrap break-word'>{comments.text}</div>
            <div className='d-flex gap-2 align-items-center text-sm '>
                <UserProfileLink 
                user={comments.author}
                />
                <p className='text-muted small '>
                {formatRelativeDate(comments.createdAt)}
                {comments.updatedAt > comments.createdAt && <span> (edited)</span>}
                </p>
                
            </div>
            <div className= "mt-1 d-flex gap-2 ">
                <Button
                variant="link"
                className='small'
                onClick={onReplyClicked}>
                    Reply
                </Button>
                {loggedInUserIsAuthor && (
                    <>
                    <Button
                    variant="link"
                    className='small'
                    onClick={onEditClicked}>
                        Edit
                    </Button>
                    <Button
                    variant='link'
                    className='small'
                    onClick={onDeleteClicked}
                    >
                        Delete
                        
                    </Button>
                    </>
                )}

            </div>
        
        </div>
    );
}
interface DeleteConfirmationProps {
    comment: CommentModel;
    onCommentDeleted: (comment:CommentModel) => void;
    onCancel: () => void;
}
function DeleteConfirmation({comment,onCommentDeleted,onCancel}:DeleteConfirmationProps){
    const [deleteInProgress, setDeleteInProgress] = useState(false); 
    async function deleteComment(){
        try {
            setDeleteInProgress(true);
            await BlogApi.deleteComment(comment._id);
            onCommentDeleted(comment);
         
            
        } catch (error) {
            console.error(error);
            if(error instanceof NotFoundError){
               onCommentDeleted(comment);
            }else{
                alert(error);
            }
        }finally{
            setDeleteInProgress(false);
        }
    }
    return(
        <div>
            <p className='text-danger'>Are you sure you want to delete this comment?</p>
            <div className='d-flex gap-2'>
                <Button
                variant='danger'
                onClick={deleteComment}
                disabled={deleteInProgress}>
                    Yes
                </Button>
                <Button
                variant='outline-primary'
                onClick={onCancel}>
                    No
                </Button>
            </div>
        </div>
    );
}