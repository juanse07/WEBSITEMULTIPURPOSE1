import { User } from '@/models/user';
import { GetServerSideProps } from 'next';
import * as UserApi from '@/network/api/user';
import * as BlogApi from '@/network/api/blog';

import { useState } from 'react';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import Head from 'next/head';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import styles from '@/styles/UserProfilePage.module.css';
import Image from 'next/image';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import { formatDate } from '@/utils/utils';
import * as yup from "yup";
import{useForm} from "react-hook-form"
import FormInputField from '@/components/form/FormInputField';
import LoadingButton from '@/components/LoadingButton';
import useSWR from 'swr';


export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async ({ params }) => {
    const username = params?.username?.toString();
    if (!username) throw Error("No username provided");
    const user = await UserApi.getUserByUsername(username);
    return {
        props: {
            user
        }
    };
};
interface UserProfilePageProps {
    user: User,
}

export default function UserProfilePage({ user }: UserProfilePageProps) {
    const {user:loggedInUser,mutateUser:mutateLoggedInUser} = useAuthenticatedUser();
    const [profileUser,setprofileUser] = useState(user);
    const isProfileOwner = (loggedInUser && (loggedInUser?._id === profileUser._id)) || false;
 
  function handleUserUpdated(updatedUser: User){
    
      mutateLoggedInUser(updatedUser);
      setprofileUser(updatedUser);}
  
      
    return (
        <>

        <Head>
        <title>{`${profileUser.username} - HandyJuan Official Website`}</title>
        </Head>
        
         <div>
            <UserInfoSection user={profileUser}/>
            {isProfileOwner && 
            
            <>
            <hr/>
            <UpdateUserProfileSection onUserUpdated={handleUserUpdated}/>
            
            </>
            }
            <hr/>
            <UserBlogPostSection user={profileUser}/>
           
        </div> 
        
        </>

    );

} 
interface UserInfoSectionProps {
    user: User,
}

function UserInfoSection({ user:{username, displayName, profilePicUrl,about,createdAt} }: UserInfoSectionProps) {
   
    return (
        <Row>
            <Col sm="auto">
            <Image 
        
            src={profilePicUrl || profilePicPlaceholder}
            alt={"Profile picture user:" + username} 
            width={200} 
            height={200} 
            priority
            className={`rounded-circle ${styles.profilePic}`}
            unoptimized
            />
            </Col>
            <Col className='mt-3 mt-sm-0'>
            <h1>{displayName}</h1>
            <div><strong>Username: </strong> {username}</div>
            <div><strong>Joined on: </strong> {formatDate(createdAt)}</div>
            <div className="pre-line"><strong>About me: </strong> <br/>{about || "This user hasn't share an about text yet"}</div>
            </Col>
        </Row>
       
    );
}

    const validationSchema = yup.object({

       displayName: yup.string(),
         about: yup.string(),
        profilePic: yup.mixed<FileList>(), 
        
    });

type UpdateUserProfileFormData = yup.InferType<typeof validationSchema>;
interface UpdateUserProfileSectionProps {
    onUserUpdated: (updatedUser: User) => void;

}


function UpdateUserProfileSection({onUserUpdated} : UpdateUserProfileSectionProps) {
    const{register, handleSubmit, formState: {isSubmitting }}=useForm<UpdateUserProfileFormData>(); 
    async function onSubmit({displayName,about,profilePic}: UpdateUserProfileFormData){
        console.log(displayName, about, profilePic);
        if (!displayName && !about && (!profilePic || profilePic.length===0)) return;

        try {
            const updatedUser = await UserApi.updateUser({displayName, about, profilePic: profilePic?.item(0) || undefined});
            onUserUpdated(updatedUser);
            
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <div>
            <h2>Update Profile</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputField
                register={register("displayName")}
                label="Display Name"
                placeholder='Display Name'
                maxLength={20} />
                <FormInputField
                register={register("about")}
                label="About"
                placeholder='tell us about yourself'
                as= "textarea"
                max={200} />
                <FormInputField
                register={register("profilePic")}
                label="Profile Picture"
                type="file"
                accept="image/png, image/jpeg" 
                />

                <LoadingButton type="submit" isloading={isSubmitting} className="mt-3">Update</LoadingButton>
                
            
            </Form>
        </div>
    );

}
interface UserBlogPostSectionProps {
    user: User,
}

function UserBlogPostSection({ user }:UserBlogPostSectionProps) {

    const {data : blogPosts, isLoading: blogPostsLoading, error: blogPostsLoadingError}= useSWR(user._id, BlogApi.getBlogPostsByUser);
    return (
        <div>
            <h2>Blog Posts</h2>
            <div className='d-flex flex-column align-items-center'>
                {blogPostsLoading && <Spinner animation="border" role="status"/>}
                {blogPostsLoadingError && <p>Error loading blog posts</p>}
                {blogPosts && blogPosts.length === 0 && <p>This user hasn&apos;t written any blog posts yet</p>}
                </div>
                {blogPosts && blogPosts.map(blogPost => (
                    <div key={blogPost._id} className='mb-3'>
              
                      <h3>{blogPost.title}</h3>
                        <p>{blogPost.content}</p>
                    </div>
                ))}
            
        </div>
     

        
    );
}