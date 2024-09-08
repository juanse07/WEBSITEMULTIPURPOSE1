import {BlogPost} from '@/models/blog-posts';
import { Card } from 'react-bootstrap';
import {formatDate} from '@/utils/utils';
interface BlogPostEntryProps { 
    post: BlogPost;
    className?: string;
}
export default function BlogPostEntry({ post : {slug, title, summary,createdAt}, className }: BlogPostEntryProps){
    return (
        <Card className={className}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle 
                className='text-muted small'>
                    <time dateTime={createdAt}>     
                    {formatDate(createdAt)}
                    </time>
                    </Card.Subtitle>
                <Card.Text>{summary}</Card.Text>
                <Card.Link href={`/blog/${slug}`}>Read more</Card.Link>
            </Card.Body>
        </Card>
    );
}