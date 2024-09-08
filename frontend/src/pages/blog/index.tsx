import BlogPostEntry from '@/components/BlogPostEntry'
import BlogPostsGrid from '@/components/BlogPostsGrid'
import { BlogPost } from '@/models/blog-posts'
import * as BlogApi from '@/network/api/blog'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Button, Col, Row } from 'react-bootstrap'

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
    const posts = await BlogApi.getBlogPosts();
    return {
        props: {
            posts
        }
    };
}
interface BlogPageProps {
    posts: BlogPost[],
}

export default function BlogPage({posts}: BlogPageProps){
    return(
        <>
        <Head>
        <title>HandyJuan Official website - about us</title>
        <meta name="description" content="my blog space" />
        
      </Head>
        <div>
            <h1>Blog</h1>
            <BlogPostsGrid posts={posts} />
          
          

           
              
        </div>

        </> 
    );
}