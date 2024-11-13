import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as UsersApi from "@/network/api/user";
import Form from "react-bootstrap/Form";
import FormInputField from "../form/FormInputField";
import PasswordInputField from "../form/PasswordInputField";
import LoadingButton from "../LoadingButton";

interface SignUpFormData{
    username: string;
    email: string;
    password: string;
}

interface SignUpModalProps {
    onDismiss: () => void,
    onLoginInsteadClicked: () => void,
}

export default function SignUpModal({onDismiss, onLoginInsteadClicked}: SignUpModalProps) {
    
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpFormData>();
    
    async function onSubmit(credentials: SignUpFormData){
        try{
    const newUser = await UsersApi.signup(credentials);
    alert(JSON.stringify(newUser));
        }catch(error){
            alert(error);
        }
    }

    return (
        <Modal  onHide={onDismiss} centered>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
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