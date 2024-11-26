import { Modal, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/user";
import Form from "react-bootstrap/Form";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";
import LoadingButton from "../LoadingButton";
import { AxiosError } from "axios";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useState } from "react";
import { BadRequestError, conflictError } from "@/network/api/http-errors";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema, usernameSchema,emailSchema } from "@/utils/validation";
import SocialSignInSection from "./SocialSignInSection";


const validationSchema = yup.object({

    username: usernameSchema.required("Username is required"),
    email: emailSchema.required("Email is required"),
    password: passwordSchema.required("Password is required"),

});

type SignUpFormData = yup.InferType<typeof validationSchema>;




interface SignUpModalProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpModal({onDismiss, onLoginInsteadClicked}: SignUpModalProps) {

    const { mutateUser} = useAuthenticatedUser();
    const [errorText, setErrorText] = useState<string | null>(null);
    
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormData>({
        resolver:yupResolver(validationSchema)
    });
    
    async function onSubmit(credentials: SignUpFormData){
        try{
            setErrorText(null);
    const newUser = await UsersApi.signup(credentials);
   mutateUser(newUser);
   onDismiss();
        }catch(error){
            if(error instanceof conflictError || error instanceof BadRequestError){
                setErrorText(error.message);
            }else {

            console.log(error);
            alert(error);
        }
    }
} 

    return (
        <Modal show  onHide={onDismiss} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorText && <Alert 
                variant="danger">{errorText}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormInputField
                register={register("username", {required: "Username is required"})}
                label="Username"
                placeholder="Enter your username"
                type="text"
                error={errors.username}
                />
                <FormInputField
                register={register("email", {required: "Email is required"})}
                label="Email"
                placeholder="Enter your email"
                type="email"
                error={errors.email}
            
                />

               <PasswordInputField
               register={register("password", {required: "Password is required"})}
               label= "Password"
               placeholder="Enter your password"
               error={errors.password}
               />
               <LoadingButton
               type="submit"
               isloading={isSubmitting}
               className="w-100">
                     Sign Up
               </LoadingButton>
                

                </Form>
                <hr/>
                <p>Or sign up with</p>
                <SocialSignInSection/>
                
                
            </Modal.Body>
            <Modal.Footer>
                <p>Already have an account?</p>
                <Button 
                variant="link"
                onClick={onLoginInsteadClicked}>Login Instead</Button>
                {/* <Button onClick={onDismiss}>Dismiss</Button> */}
            </Modal.Footer>

        </Modal>
    )
}