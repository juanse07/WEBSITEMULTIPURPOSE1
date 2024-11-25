import { Button, Form, Spinner } from "react-bootstrap";
import {useForm} from "react-hook-form";
import * as BlogApi from "@/network/api/blog";
import Head from 'next/head';
import FormInputField from "@/components/form/FormInputField";
import MarkDownEditor from "@/components/form/MarkDownEditor";
import { generateSlug } from "@/utils/utils";

import LoadingButton from "@/components/LoadingButton";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { requiredFileSchema, requiredStringschema, slugSchema } from "@/utils/validation";

import AuthGuard from "@/components/auth/AuthGuard";
import { useUnsavedChangesWarning } from "@/hooks/useUnsavedChangesWarning";



const validationSchema = yup.object({
    title: requiredStringschema,
    slug: slugSchema.required("Slug is required"),
    summary: requiredStringschema,
    featuredImage: requiredFileSchema,
    body: requiredStringschema,
});
type CreatePostFormData = yup.InferType<typeof validationSchema>;


export default function createPostPage(){
   

    const router = useRouter();

    const {register, handleSubmit,setValue,getValues,watch, formState:{errors,isSubmitting,isDirty}} =useForm<CreatePostFormData>({
        resolver: yupResolver(validationSchema),
});
    

    async function onSubmit({title, slug, summary, featuredImage, body}: CreatePostFormData){
       alert(JSON.stringify({title, slug, summary, featuredImage:featuredImage[0], body}));
        try {
            
            await BlogApi.createBlogPost({title, slug, summary, featuredImage:featuredImage[0], body});
            
            await router.push("/blog/" + slug);
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
  useUnsavedChangesWarning(isDirty && !isSubmitting);
   
    return(
        <AuthGuard>
        
        <div>
            <Head>
                <title>HandyJuan official Website - Create a new order </title>       
            </Head>
            <h1>Create a new order</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputField 
                register={register("title")} 
                label="Post title"
                placeholder="post title"
                maxLength={100}
                error={errors.title}
                onBlur={generateSlugFromTitle}
                />

                <FormInputField 
                register={register("slug")} 
                label="Post slug"
                placeholder="post slug"
                maxLength={100}
                error={errors.slug}/>
                
                
                <FormInputField 
                register={register("summary")} 
                label="Post summary"
                placeholder="post summary"
                maxLength={100}
                error={errors.summary}
                as="textarea"/>
                
                <FormInputField
                register={register("featuredImage")}
                label="Post Image"
                type="file"
                accept="image/png, image/jpeg"
                error={errors.featuredImage}
                
                />
               
                <MarkDownEditor
                label="post Body"
                register={register("body")}
                watch={watch}
                setValue={setValue}
                error={errors.body}
                />

              
                

                 <LoadingButton type="submit" isloading={isSubmitting}>
                    Create Post
                    </LoadingButton>
            </Form>
        
               
        </div>
        </AuthGuard>
    )
};