import { BlogPost } from "@/models/blog-posts"
import * as BlogApi from '@/network/api/blog'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';

import styles from '@/styles/BlogPostPage.module.css';  
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import Image from 'next/image';
import { NotFoundError } from "@/network/api/http-errors";

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await BlogApi.getAllBlogPostSlugs();
    const paths = slugs.map((slug) => ({
        params: { slug }
    }));
    return {
        paths,
        fallback: "blocking",
    };   
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
try {

    const slug = params?.slug?.toString()!;
    if (!slug) throw Error("No slug provided");
    const post = await BlogApi.getBlogPostBySlug(slug);
    return {
        props: {
            post
        }
    };
    
} catch (error) {
    if (error instanceof NotFoundError) {
        return {
            notFound: true,
        };
    }else {
        throw error;
    }
    
}
    
}


interface BlogPostPageProps {
    post:BlogPost,
}

export default function BlogPostPage({ post:{_id, slug, title, summary, body, featuredImageUrl, createdAt, updatedAt} }: BlogPostPageProps) {
  const createdupdatedText = updatedAt > createdAt 
  ? <> updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time >
  </>: <time dateTime={createdAt}>{formatDate(createdAt)}</time >;

console.log('Attempting to load image from:', featuredImageUrl)
    return (
    <>
  
    <Head>
    <title>{`${title}- HandyJuan Official Website`}</title>
    <meta name="description" content= {summary} />
    </Head>
    <div className={styles.container}>
        <div className="text-center mb-4">
            <Link href="/blog"> Blog Home </Link>
        </div>

        <article>
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center mb-3">{title}</h1>
                <p className="text-center mb-3 h5">{summary}</p>
                <span className="text-muted">{createdupdatedText}</span>
                <div className={styles.featuredImageWrapper}>
                <Image
                src={featuredImageUrl} 
                alt="post Image" 
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                priority
                className="rounded"
                onError={(e) => {
                    console.error('Image error details:', {
                      src: e.currentTarget.src,
                      naturalWidth: e.currentTarget.naturalWidth,
                      naturalHeight: e.currentTarget.naturalHeight,
                      error: e
                    });
                  }}
                  onLoad={() => console.log('Image loaded successfully from:', featuredImageUrl)}
               />
               </div>
            </div>
            <div>
                {body}
            </div>
        </article>

    </div>
    </>  
  );
}