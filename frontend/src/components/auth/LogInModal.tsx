import {useForm} from "react-hook-form";
import * as UsersApi from "@/network/api/user";
import { Button, Form, Modal } from "react-bootstrap";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";
import LoadingButton from "../LoadingButton";

interface LoginFormData {
    username: string;
    password: string;

}

interface LoginModalProps {
    onDismiss: () => void,
    onSignUpInsteadClicked: () => void,
    onForgotPasswordClicked: () => void,
}

export default function LogInModal({onDismiss, onSignUpInsteadClicked, onForgotPasswordClicked}: LoginModalProps): JSX.Element {
   const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormData>();
   async function onSubmit(credentials: LoginFormData){
         try{
              const user = await UsersApi.login(credentials);
              alert(JSON.stringify(user));
         }catch(error){
            console.log(error);
              alert(error);
         }
   }
    return(
        <Modal show onHide={onDismiss} centered>
            
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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