import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import useCountdown from '@/hooks/useCountdown';
import { emailSchema, passwordSchema, requiredStringschema } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as UsersApi from '@/network/api/user';
import { BadRequestError, conflictError, NotFoundError } from '@/network/api/http-errors';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import FormInputField from '../form/FormInputField';
import PasswordInputField from '../form/PasswordInputField';
import LoadingButton from '../LoadingButton';
import SocialSignInSection from './SocialSignInSection';

const validationSchema = yup.object({
    email: emailSchema.required(),
        
    password: passwordSchema.required(),
    verificationCode: requiredStringschema,

});
type ResetPasswordFormData = yup.InferType<typeof validationSchema>;

interface ResetPasswordModalProps {
    onDismiss: () => void;
    onSignUpClicked: () => void;
}

export default function ResetPasswordModal({onDismiss,onSignUpClicked}: ResetPasswordModalProps) {
    const { mutateUser} = useAuthenticatedUser();
   
    const [verificationCodeRequestPending, setVerificationCodeRequestPending] = useState(false);
    const [showVerificationCodeSenttext, setShowVerificationCodeSent] = useState(false);
    const {timeLeft,start} = useCountdown();
    

    const [errorText, setErrorText] = useState<string | null>(null);
   
    const {register, handleSubmit, getValues,trigger, formState: {errors, isSubmitting}} = useForm<ResetPasswordFormData>({
        resolver:yupResolver(validationSchema)
    });

    async function onSubmit(credentials: ResetPasswordFormData){
        try{
            setErrorText(null);
            setShowVerificationCodeSent(false);
    const user = await UsersApi.resetPassword(credentials);
   mutateUser(user);
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
            await UsersApi.requestResetPasswordCode(emailInput);
            setShowVerificationCodeSent(true);
            start(60);
            
        }catch(error){
            if(error instanceof NotFoundError ){
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
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorText && <Alert 
                variant="danger">{errorText}</Alert>}
                {showVerificationCodeSenttext && <Alert
                variant="warning">Verification code sent. Please check your email.</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
               
                <FormInputField
                register={register("email", {required: "Email is required"})}
                label="Email"
                placeholder="Enter your email"
                type="email"
                error={errors.email}
            
                />

               <PasswordInputField
               register={register("password", {required: "Password is required"})}
               label= "New Password"
               placeholder="Enter your New password"
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
                   Submit
               </LoadingButton>
                

                </Form>
             
                
            </Modal.Body>
            <Modal.Footer>
                <p>Already have an account?</p>
                <Button 
                variant="link"
                onClick={onSignUpClicked}>Sign Up</Button>
                {/* <Button onClick={onDismiss}>Dismiss</Button> */}
            </Modal.Footer>

        </Modal>
    );
}