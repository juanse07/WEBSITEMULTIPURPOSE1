import { Button, Form } from "react-bootstrap";
import {useForm} from "react-hook-form";
import * as BlogApi from "@/network/api/blog";
interface CreatePostFormData{
    slug: string,
    title: string,
    summary: string,
    body: string,
}
export default function createPostPage(){

    const {register, handleSubmit} =useForm<CreatePostFormData>();
    

    async function onSubmit(input: CreatePostFormData){
       //alert(JSON.stringify(input));
        try {
            
            await BlogApi.createBlogPost(input);
            alert("Post created successfully");

        } catch (error) {
            console.error(error);
            alert("Error creating post");
        }
    }
    return(
        <div>
            <h1>Create a new post</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="title-input">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control 
                    {...register("title")}
                    placeholder="Enter title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="slug-input">
                    <Form.Label>Post Slug</Form.Label>
                    <Form.Control 
                    {...register("slug")}
                    placeholder="Enter slug" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="summary-input">
                    <Form.Label>Post Summary</Form.Label>
                    <Form.Control 
                    {...register("summary")}
                    placeholder="Enter summary"
                    as="textarea" />

                </Form.Group>

                <Form.Group className="mb-3" controlId="body-input">
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control 
                    {...register("body")}
                    placeholder="Enter body"
                    as="textarea" />   
                </Form.Group>
                <Button type="submit">Create Post</Button>
            </Form>
        
               
        </div>
    )
};