import { BlogPost} from"@/models/blog-posts";
import { GetServerSideProps } from "next";
import * as BlogApi from "@/network/api/blog";
import { NotFoundError } from "@/network/api/http-errors";
import * as yup from "yup";
import { requiredFileSchema, requiredStringschema, slugSchema } from "@/utils/validation";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Spinner } from "react-bootstrap";
import FormInputField from "@/components/form/FormInputField";
import MarkDownEditor from "@/components/form/MarkDownEditor";
import LoadingButton from "@/components/LoadingButton";
import { useUnsavedChangesWarning } from "@/hooks/useUnsavedChangesWarning";
import { generateSlug } from "@/utils/utils";
import AuthGuard from "@/components/auth/AuthGuard";
import AuthorizedContentGuard from "@/components/auth/AuthorizedContentGuard";
import { useState } from "react";
import { set } from "nprogress";
import ConfirmationModal from "@/components/ConfirmationModal";

export const getServerSideProps: GetServerSideProps<EditBlogPostPageProps> = async ({params}) => {
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
interface EditBlogPostPageProps {
    post: BlogPost;
}

const validationSchema = yup.object({
    title: requiredStringschema,
    slug: slugSchema.required("Slug is required"),
    summary: requiredStringschema,
    featuredImage: yup.mixed<FileList>(),
    body: requiredStringschema,


});
type EditPostFormData = yup.InferType<typeof validationSchema>;
export default function EditBlogPostPage({post}: EditBlogPostPageProps) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePending, setDeletePending] = useState(false);
    const{user,userloading}=useAuthenticatedUser();
    const router = useRouter();
    const {register, handleSubmit, setValue, getValues, watch, formState:{errors,isSubmitting,isDirty}} = 
    useForm<EditPostFormData>({
        resolver:yupResolver(validationSchema),
        defaultValues: {
            title: post.title,
            slug: post.slug,
            summary: post.summary,
            body: post.body,
        }
    })

    async function onSubmit({title, slug, summary, featuredImage, body}: EditPostFormData){
      
        try {
            
            await BlogApi.updateBlogPost(post._id, {title, slug, summary, featuredImage:featuredImage?.item(0) || undefined, body});
        
            await router.push("/blog/" + slug);
        
        } catch (error) {
            console.error(error);
            alert("Error updating post");
        }
    }
   async function onDeleteConfirmed(){
        setShowDeleteModal(false);
       setDeletePending(true);
       try {
           await BlogApi.deleteBlogPost(post._id);
           await router.push("/blog");
       } catch (error) {
           console.error(error);
           alert("Error deleting post");
       } finally {
           setDeletePending(false);
       }

   }
    function generateSlugFromTitle(){
        if(getValues("slug") ) return;
          
        const slug= generateSlug(getValues("title"));
        setValue("slug", slug,{shouldValidate: true});
    }

    useUnsavedChangesWarning(isDirty && !isSubmitting && !deletePending);
   
    // const userIsAuthorized = (user && user._id === post.author._id) || false;
    //   if (!userloading && !userIsAuthorized) {
        //    // useUnsavedChangesWarning(isDirty && !isSubmitting);
    //      return <p>You need to LogIn to edit this post</p>;
        //     } 
        //     if(userloading)
    //         return <Spinner animation ="border" className="d-block m-auto"/>
    return (
        <div>
            <h1>Edit Blog Post</h1>
            <AuthorizedContentGuard user={user || undefined} 
            userLoading={userloading} 
            authorId={post.author._id}
            >

         
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
                accept="image/png, image/jpeg,image/jpg"
                error={errors.featuredImage}
                
                />
               
                <MarkDownEditor
                label="post Body"
                register={register("body")}
                watch={watch}
                setValue={setValue}
                error={errors.body}
                />

              
                
                <div className="d-flex justify-content-between">
                 <LoadingButton 
                 type="submit" 
                 isloading={isSubmitting}
                 disabled={deletePending}>
                    Edit Post
                    </LoadingButton>
                    <Button 
                    variant="outline-danger" 
                    onClick={() => setShowDeleteModal(true)} 
                    disabled={deletePending}>
                                Delete Post
                    </Button>
                    </div>
                    
            </Form> 
            </AuthorizedContentGuard>

            
            <ConfirmationModal
            show={showDeleteModal}
            title="Delete Post"
            message="confirm you want to delete the Post"
            confirmButtonText="Delete"
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={onDeleteConfirmed}
            variant="danger"/>

        

            
        </div>
    );

 
} 