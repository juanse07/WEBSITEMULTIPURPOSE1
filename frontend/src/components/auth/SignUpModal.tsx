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
import { passwordSchema, usernameSchema,emailSchema, requiredStringschema } from "@/utils/validation";
import SocialSignInSection from "./SocialSignInSection";
import { set } from "nprogress";
import useCountdown from "@/hooks/useCountdown";


const validationSchema = yup.object({

    username: usernameSchema.required("Username is required"),
    email: emailSchema.required("Email is required"),
    password: passwordSchema.required("Password is required"),
    verificationCode: requiredStringschema,

});

type SignUpFormData = yup.InferType<typeof validationSchema>;




interface SignUpModalProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpModal({onDismiss, onLoginInsteadClicked}: SignUpModalProps) {

    const { mutateUser} = useAuthenticatedUser();
   
    const [verificationCodeRequestPending, setVerificationCodeRequestPending] = useState(false);
    const [showVerificationCodeSenttext, setShowVerificationCodeSent] = useState(false);
    const {timeLeft,start} = useCountdown();
    

    const [errorText, setErrorText] = useState<string | null>(null);
   
    const {register, handleSubmit, getValues,trigger, formState: {errors, isSubmitting}} = useForm<SignUpFormData>({
        resolver:yupResolver(validationSchema)
    });
    
    async function onSubmit(credentials: SignUpFormData){
        try{
            setErrorText(null);
            setShowVerificationCodeSent(false);
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

async function handleVerificationCodeRequest(){
    const validEmailInput = await trigger("email");
    if(!validEmailInput)return;
        const emailInput = getValues("email");
        setErrorText(null);
        setShowVerificationCodeSent(false);
        setVerificationCodeRequestPending(true);
        try{
            await UsersApi.requestEmailVerificationCode(emailInput);
            setShowVerificationCodeSent(true);
            start(60);
            
        }catch(error){
            if(error instanceof conflictError || error instanceof BadRequestError){
                setErrorText(error.message);
            }else{
                console.log(error);
                alert(error);
            }
        }finally{
            setVerificationCodeRequestPending(false);
           
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
                {showVerificationCodeSenttext && <Alert
                variant="warning">Verification code sent. Please check your email.</Alert>}
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
               <FormInputField
               register={register("verificationCode")}
               label="Verification Code"
                placeholder="Enter the verification code sent to your email"
                type="number"
                error={errors.verificationCode}
                inputGroupElement={<Button
                id="button-send-verification-code"
                disabled={verificationCodeRequestPending || timeLeft > 0}
                onClick={handleVerificationCodeRequest}>
              
                    Send Code
                    {timeLeft > 0 && `(${timeLeft})`}
                </Button>
                }
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