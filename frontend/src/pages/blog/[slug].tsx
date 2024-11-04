import { BlogPost } from "@/models/blog-posts"
import * as BlogApi from '@/network/api/blog'
import { GetStaticPaths, GetStaticProps } from 'next'

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

export default function BlogPostPage({ post }: BlogPostPageProps) {
  return (
    <>
    {JSON.stringify(post)}
    <div>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      <p>{post.body}</p>
    </div>
    </>  
  );
}