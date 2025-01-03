import profilePicPlaceholder from '@/assets/images/profile-pic-placeholder.png';
import logo from "@/assets/images/technician (3).png";
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { User } from '@/models/user';
import styles from '@/styles/NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';

import * as UsersApi from '@/network/api/user';
import { AuthModalsContext } from './auth/AuthModalsProvider';

export default function NavBar() {
    const {user, userloading, userLoadingError, mutateUser} =useAuthenticatedUser();
    const router = useRouter();
    return (
        <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top" >
            <Navbar.Brand as={Link} href='/' className='d-flex align-items-center gap-1'>
            <Image src={logo} alt="technician (3)" width={30} height={30}/> 
            <span className={styles.brandText}>
              Elego Prime
            </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='main-navbar'/>
            <Navbar.Collapse id='main-navbar'>
                <Nav>
                    <Nav.Link as={Link}href='/' active={router.pathname==="/"}>Home</Nav.Link>
                    <Nav.Link as={Link} href='/blog' active={router.pathname==="/blog"}>About</Nav.Link>
                    
                    <Nav.Link as={Link} href='/contact' active={router.pathname==="/contact"}>
                                Contact</Nav.Link>
                </Nav>
               
                {user?  <LoggedIniew user={user}/> : <LoggedOutiew/>}
            </Navbar.Collapse>
        </Navbar>
    );
}

interface LoggedIniewProps {
    user: User,
}
function LoggedIniew( {user}: LoggedIniewProps) {
   const router = useRouter();
   const {mutateUser} = useAuthenticatedUser();
   async function handleLogout(){
    try {
        await UsersApi.logout();
        mutateUser(null);
        
    } catch (error) {
        console.error(error);
        alert(error);
    }
   };
    return (
        <Nav className='ms-auto me-5'>
        <Nav.Link as={Link} href='/blog/new-post' 
                    active={router.pathname==="/blog/new-post"} 
                    className='link-primary d-flex align-items-center gap-1 me-3'>
                    <FiEdit/>
                   Book a Service
       </Nav.Link>
       <Navbar.Text
       className="d-flex align-items-center gap-2">
            Hey, {user.displayName || "User"}!
       </Navbar.Text>
       <NavDropdown
       className="d-flex align-items-center gap-2"
       title = {
              <Image 
              src={user.profilePicUrl || profilePicPlaceholder}
              alt={user.displayName || "User"}
              width={70}
              height={70}
              className='rounded-circle'
              />
       }> {user.username &&
            <NavDropdown.Item as={Link} href={`/users/${user.username}`}>Profile</NavDropdown.Item>}
            <NavDropdown.Item as={Link} href='/users/orders'>Orders</NavDropdown.Item>
            <NavDropdown.Item as={Link} href='/users/settings'>Settings</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={handleLogout
            }>Log Out</NavDropdown.Item>
       </NavDropdown>
        </Nav>
    );
 }

function LoggedOutiew (){
    const authModalsContext = useContext(AuthModalsContext);
 
    
    return (
       
       <Nav className='ms-auto'>
       <div className='d-flex justify-content-center justify-content-md-start'>
       <Button
       variant='outline-primary'
       className='ms-md-2 mt-2 mt-md-0 ms-3'
       onClick={()=> authModalsContext.showLoginModal()}>
        Log In
       </Button>
       <Button 
       onClick={()=> authModalsContext.showSignUpModal()}
       className='ms-md-2 mt-2 mt-md-0 ms-3 me-3'>
              Sign Up
       </Button>
       
       
        </div>
        </Nav>
       
    );
}

