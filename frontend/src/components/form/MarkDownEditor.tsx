import dynamic from "next/dynamic";
import { Field, FieldError, UseFormRegisterReturn,UseFormWatch,UseFormSetValue } from "react-hook-form";
import { Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import * as BlogApi from "@/network/api/blog";
import Markdown from "./MarkDown";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false,
}); 
interface MarkDownEditorProps {
    register: UseFormRegisterReturn;
    watch:UseFormWatch<any>;
    setValue:UseFormSetValue<any>;
    label?: string;
    error?: FieldError;
    editorheight?: number;
}
export default function MarkDownEditor({register,watch,setValue, label, error, editorheight= 500}: MarkDownEditorProps){
   async function uploadInpostImage(image:File){
    try {
        const response = await BlogApi.uploadInPostImage(image);
         
        return response.imageUrl;
        
    } catch (error) {
        console.error(error);
        alert(error);
    }
   }
    return(
        <Form.Group className="mb-3" controlId={register.name +"-input"}>
            { label && <Form.Label>{label}</Form.Label>}
            <MdEditor 
                {...register}
                renderHTML={(text) => <Markdown>{text}</Markdown>}
                value={watch(register.name)}
                onChange={({text}) => setValue(register.name, text, {shouldValidate: true, shouldDirty: true })}
                placeholder="write something here..."
                className= {error ? "is-invalid" : ""}
                style={{height: editorheight}}
                onImageUpload={uploadInpostImage}
                imageAccept=".jpeg,.png"
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}