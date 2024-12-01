import * as yup from "yup";
import {Comment} from "@/models/comment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as BlogApi from "@/network/api/blog";
import { Button, Form } from "react-bootstrap";
import FormInputField from "../form/FormInputField";
import LoadingButton from "../LoadingButton";
import { useEffect } from "react";

const validationSchema = yup.object({ 
text: yup.string(),

});
type UpdateCommentInput = yup.InferType<typeof validationSchema>;

interface EditCommentBoxProps {
    comment: Comment,
    onCommentUpdate: (updatedComment: Comment) => void,
    onCancel: () => void, 
}
export default function EditcommentBox({comment, onCommentUpdate, onCancel}: EditCommentBoxProps){

const {register, handleSubmit, formState: {isSubmitting}, setFocus} = useForm<UpdateCommentInput>({
   defaultValues: {text: comment.text},
   resolver: yupResolver(validationSchema),
});
    
async function onSubmit({text}: UpdateCommentInput){
    if(!text) return;
    try {

        const updatedComment = await BlogApi.updateComment(comment._id, text);
        onCommentUpdate(updatedComment);
        
    } catch (error) {
        console.error(error);
        alert(error);
    }
}
useEffect(() => {
    setFocus("text");
}, [setFocus]);

return (
    <div className="mt-2">
        <div className="mb-2">
            Edit Comment
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInputField
            register={register("text")}
            as="textarea"
            maxLength={600}
            />
            <LoadingButton
            type= "submit"
            isloading= {isSubmitting}
            >
                Send
            </LoadingButton>
            <Button
            onClick={onCancel}
            className="ms-2"
            variant= "outline-primary">

                Cancel

            </Button>
        </Form>
        
    </div>
   
);

}
