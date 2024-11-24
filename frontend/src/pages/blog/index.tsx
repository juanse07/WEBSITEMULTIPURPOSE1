import BlogPostEntry from '@/components/BlogPostEntry'
import BlogPostsGrid from '@/components/BlogPostsGrid'
import PaginationBar from '@/components/PaginationBar'
import { BlogPost,BlogPostPage } from '@/models/blog-posts'
import * as BlogApi from '@/network/api/blog'
import { GetServerSideProps,GetStaticPaths,GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { stringify } from 'querystring'
import { Button, Col, Row } from 'react-bootstrap'




export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({ query }) => {
    const page = parseInt(query.page?.toString() || "1");
    if (page < 1) {
        query.page = "1";
        return {
            redirect: {
                destination: "/blog?" + stringify(query),
                permanent: false,
            }
        };
    }
    const data = await BlogApi.getBlogPosts(page);

    if(data.totalPages > 0 && page > data.totalPages){
        query.page = data.totalPages.toString();
        return {
            redirect: {
                destination: "/blog?" + stringify(query),
                permanent: false,
            }
        };
    }
    return {
        props: {
             data
        }
    };
}
interface BlogPageProps {
    data: BlogPostPage,
}

export default function BlogPage({data: {blogPosts, page, totalPages}}: BlogPageProps){
    const router = useRouter();
    return(
        <>
        <Head>
        <title>HandyJuan Official website - about us</title>
        <meta name="description" content="my blog space" />
        
      </Head>
        <div>
            <h1>Blog</h1>
            {blogPosts.length > 0 && <BlogPostsGrid posts={blogPosts} 
            /> }  
            <div className="d-flex flex-column align-items-center">     
            {blogPosts.length === 0 && <p>No blog posts found</p>}
            {blogPosts.length > 0 && <PaginationBar
            currentPage={page}
            pageCount={totalPages}
            onPageItemClick={(page)=>{
                router.push({query: {...router.query, page} })
                }}
             className='mt-4' 
                />
            }    
            </div>
              
        </div>

        </> 
    );
}