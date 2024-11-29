import { formatRelativeDate } from '@/utils/utils';
import { Comment as CommentModel} from '../../models/comment';
import UserProfileLink from '../UserProfileLink';

interface CommentProps {
    comment: CommentModel;

}

export default function Comment({comment}: CommentProps) {


    return (
    <div >
        <hr/>
        <CommentLayout comments={comment}/>     
    </div>    
    ); 
}

interface CommentLayoutProps {
    comments: CommentModel;
}

function CommentLayout({comments}: CommentLayoutProps) {
    return (
        <div>
            <div className='mb-2'>{comments.text}</div>
            <div className='d-flex gap-2 align-items-center'>
                <UserProfileLink user={comments.author}/>
                {formatRelativeDate(comments.createdAt)}
                {comments.updatedAt > comments.createdAt && <span> (edited)</span>}
                
            </div>
        </div>
    );
}