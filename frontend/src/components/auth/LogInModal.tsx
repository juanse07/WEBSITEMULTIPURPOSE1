import {useForm} from "react-hook-form";
import * as UsersApi from "@/network/api/user";
import { Button, Form, Modal, Alert} from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";
import LoadingButton from "../LoadingButton";
import { useState } from "react";
import { ToomanyrequestError, UnauthorizedError } from "@/network/api/http-errors";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { mutate } from "swr";
import * as yup from "yup";
import { requiredStringschema } from "@/utils/validation";
import SocialSignInSection from "./SocialSignInSection";

const validationschema = yup.object().shape({
    username: requiredStringschema,
    password: requiredStringschema,
});

 type LoginFormData = yup.InferType<typeof validationschema>;

interface LoginModalProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LogInModal({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginModalProps): JSX.Element {
   const { mutateUser} = useAuthenticatedUser();
    const [errorText, setErrorText] = useState<string | null>(null);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormData>({
        resolver: yupResolver(validationschema)
    });
   async function onSubmit(credentials: LoginFormData){
         try{
                setErrorText(null);
              const user = await UsersApi.login(credentials);
              mutateUser(user);
            onDismiss();
            }catch(error){
            if (error instanceof UnauthorizedError){
                setErrorText("Invalid username or password");
            }else if(error instanceof ToomanyrequestError){
                setErrorText("Too many requests, please try again later");


            }else{

            console.log(error);
              alert(error);
         }
   }

}
    return(
        <Modal show onHide={onDismiss} centered>
            
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
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

            <PasswordInputField
               register={register("password", {required: "Password is required"})}
               label= "Password"
               placeholder="Enter your password"
               error={errors.password}
               />
            <Button variant="link" onClick={onForgotPasswordClicked} className="d-block ms-auto mt-n3 small">Forgot password?</Button>
              
            <LoadingButton
               type="submit"
               isloading={isSubmitting}
               className="w-100">
                     Log In
               </LoadingButton>
              
                </Form>

                <hr/>
                <p>Or Log In with</p>
                <SocialSignInSection/>


            </Modal.Body>
            <Modal.Footer>
                <p>Don&apos;t have an account yet?</p>
                <Button 
                variant="link"
                onClick={onSignUpInsteadClicked}>Sign Up Instead</Button>
                {/* <Button onClick={onDismiss}>Dismiss</Button> */}
            </Modal.Footer>
            
            </Modal>

    );
}