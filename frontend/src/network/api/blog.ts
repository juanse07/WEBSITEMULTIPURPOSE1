import { BlogPost } from "@/models/blog-posts"
import api from "@/network/axiosInstance"

export async function getBlogPosts(){
    const response = await api.get<BlogPost[]>('/posts/');
    return response.data;
}
interface CreateBlogPostValues {
    slug: string,
    title: string,
    summary: string,
    body: string,
    featuredImage: File,

}

export async function createBlogPost(input: CreateBlogPostValues){
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
    });
    const response = await api.post<BlogPost>('/posts/', formData);
    return response.data
} 