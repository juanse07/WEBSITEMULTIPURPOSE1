import { BlogPost } from "@/models/blog-posts"
import * as BlogApi from '@/network/api/blog'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head';

import styles from '@/styles/BlogPostPage.module.css';  
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import Image from 'next/image';

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
    const slug = params?.slug?.toString()!;
    if (!slug) throw Error("No slug provided");
    const post = await BlogApi.getBlogPostBySlug(slug);
    return {
        props: {
            post
        }
    };
}


interface BlogPostPageProps {
    post:BlogPost,
}

export default function BlogPostPage({ post:{_id, slug, title, summary,body, feauturedImageUrl, createdAt, updatedAt} }: BlogPostPageProps) {
  const createdupdatedText = updatedAt > createdAt 
  ? <> updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time >
  </>: <time dateTime={createdAt}>{formatDate(createdAt)}</time >;

  
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
                <Image 
                src={feauturedImageUrl} 
                alt="post Image" 
                width={700} 
                height={450} 
                priority
                
                onError={(e) => {
                    console.error('Image error:', e);
                  }}/>
            </div>
        </article>

    </div>
    </>  
  );
}