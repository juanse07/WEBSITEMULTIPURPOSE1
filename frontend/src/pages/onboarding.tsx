import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { use, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as UsersApi from '@/network/api/user';
import { Form } from 'react-bootstrap';
import FormInputField from '@/components/form/FormInputField';
import LoadingButton from '@/components/LoadingButton';
const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
   
});

type OnboardingFormData = yup.InferType<typeof validationSchema>;
export default function Onboarding() {

    const {user, mutateUser} = useAuthenticatedUser();
    const router =useRouter();
    const {register,handleSubmit,formState: {errors,isSubmitting}} = useForm<OnboardingFormData>({
        resolver: yupResolver(validationSchema),
    });
    async function onSubmit({username}: OnboardingFormData){
        try {
            const updatedUser = await UsersApi.updateUser({username, displayName: username});
            mutateUser(updatedUser);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    useEffect(()=>{
        if(user?.username){
            const returnTo = router.query.returnTo?.toString();
            router.push(returnTo || "/");
        }
    },[user,router]);
    return (
        <div>
            <h1>Onboarding</h1>
            <p>thank you for signing up now you can set your username</p>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <FormInputField
                register={register("username")}
                placeholder='Username'
                error={errors.username}
                maxLength={20}
                >
                    
                </FormInputField>
                <LoadingButton
                type="submit"
                isloading={isSubmitting}>
                    Submit
                </LoadingButton>
            </Form>
        </div>
    );
}