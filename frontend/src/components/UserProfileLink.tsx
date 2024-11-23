import {User} from '@/models/user';
import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import Image from 'next/image';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {formatDate} from '@/utils/utils';


interface UserProfileLinkProps {
    user: User,
}

export default function UserProfileLink({ user }: UserProfileLinkProps) {
    return (
        <OverlayTrigger
        overlay={
            <Tooltip className='position- absolute'>
             <UserTooltipContent user={user}/>
            </Tooltip>
        }
        delay={{show:500, hide:0}}>
       <span className='d-flex aling-items-center w-fit-content'>
            <Image 
            src={user.profilePicUrl || profilePicPlaceholder} 
            alt={"Profile picture of " + user.username} 
            width={40} 
            height={40} 
            className="rounded-circle mb-1" 
            />
            <Link href={`/users/${user.username}`} className='ms-2'>
                {user.username}
            </Link>
       </span>
         </OverlayTrigger>
    );

}
interface UserTooltipContentProps {
    user: User,
}
function UserTooltipContent({user:{username,about,profilePicUrl, createdAt}}: UserTooltipContentProps){
    return (
        <div className='p-2'>
            <Image 
            src={profilePicUrl || profilePicPlaceholder} 
            alt={"Profile picture of " + username} 
            width={150} 
            height={150} 
            className="rounded-circle" 
            />
           
            <div className='text-start'>
                <strong> Username:</strong>   {username}  <br/>  
                <strong> Joined on:</strong>   {formatDate(createdAt)} <br/>
                {about && <> <strong> About:</strong>   {about}    <br/></>}

            </div>
        </div>

        
    );

}