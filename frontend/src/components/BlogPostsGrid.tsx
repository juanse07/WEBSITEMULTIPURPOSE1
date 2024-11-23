import { Button, Row, Col } from 'react-bootstrap';
import BlogPostEntry from '@/components/BlogPostEntry';
import { BlogPost } from '@/models/blog-posts';
import styles from '@/styles/BlogPostsGrid.module.css';

interface BlogPostGridProps {
    posts: BlogPost[];
}

export default function BlogPostsGrid({ posts }: BlogPostGridProps) {
    return (
        <Row xs ={1} sm={2} lg={3} className= 'g-4'>
        { posts.map((post) => (
            <Col className='g-4' key={post._id}>
              <BlogPostEntry post={post} className={styles.entry}/>
              </Col>
        ))}
    </Row>
    );
}