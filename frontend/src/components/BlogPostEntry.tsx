import {BlogPost} from '@/models/blog-posts';
import { Card } from 'react-bootstrap';
import {formatDate} from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
interface BlogPostEntryProps { 
    post: BlogPost;
    className?: string;
}
export default function BlogPostEntry({ post : {slug, title, summary,featuredImageUrl,createdAt}, className }: BlogPostEntryProps){
    return (
        <Card className={className}>
            <article>
                <Link href={`/blog/${slug}`}>
            <Image 
            alt='Blog Image'
            width={550}
            height={200} 
           className='card-img-top object-fit-cover'
            src={featuredImageUrl} 
            />
            </Link>
            <Card.Body>
                <Card.Title>
                    <Link href={`/blog/${slug}`}>
                    {title}
                    </Link>
                    </Card.Title>
                <Card.Subtitle 
                className='text-muted small'>
                    <time dateTime={createdAt}>     
                    {formatDate(createdAt)}
                    </time>
                    </Card.Subtitle>
                <Card.Text>{summary}</Card.Text>
                <Card.Link href={`/blog/${slug}`}>Read more</Card.Link>
            </Card.Body>
            </article>
        </Card>
    );
}