import { Button, Form } from "react-bootstrap";
import {useForm} from "react-hook-form";
import * as BlogApi from "@/network/api/blog";
import Head from 'next/head';
import FormInputField from "@/components/form/FormInputField";
import MarkDownEditor from "@/components/form/MarkDownEditor";
import { generateSlug } from "@/utils/utils";
import { set } from "nprogress";
import LoadingButton from "@/components/LoadingButton";

interface CreatePostFormData{
    slug: string,
    title: string,
    summary: string,
    body: string,
    featuredImage: FileList
}
export default function createPostPage(){

    const {register, handleSubmit,setValue,getValues,watch, formState:{errors,isSubmitting}} =useForm<CreatePostFormData>();
    

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
    function generateSlugFromTitle(){
        if(getValues("slug") ) return;
          
        const slug= generateSlug(getValues("title"));
        setValue("slug", slug,{shouldValidate: true});
    }
    return(
        
        <div>
            <Head>
                <title>HandyJuan official Website - Create a new order </title>       
            </Head>
            <h1>Create a new order</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputField 
                register={register("title", {required: "Title is required"})} 
                label="Post title"
                placeholder="post title"
                maxLength={100}
                error={errors.title}
                onBlur={generateSlugFromTitle}
                />

                <FormInputField 
                register={register("slug", {required: "Slug is required"})} 
                label="Post slug"
                placeholder="post slug"
                maxLength={100}
                error={errors.slug}/>
                
                
                <FormInputField 
                register={register("summary", {required: "Summary is required"})} 
                label="Post summary"
                placeholder="post summary"
                maxLength={100}
                error={errors.summary}
                as="textarea"/>
                
                <FormInputField
                register={register("featuredImage", {required: "Featured Image is required"})}
                label="Post Image"
                type="file"
                accept="image/png, image/jpeg"dlfm, dclx,.dckcddeyrgfJ    ;
                ;F? ,B?CVBB/V.BV.BVV.C 
                
                />
               
                <MarkDownEditor
                label="post Body"
                register={register("body",{required:"Required"})}
                watch={watch}
                setValue={setValue}
                error={errors.body}
                />

              
                

                 <LoadingButton type="submit" isloading={isSubmitting}>
                    Create Post
                    </LoadingButton>
            </Form>
        
               
        </div>
    )
};