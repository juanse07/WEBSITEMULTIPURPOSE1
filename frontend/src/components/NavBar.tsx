import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Nav,Navbar } from 'react-bootstrap';
import { FiEdit} from 'react-icons/fi';
import logo from "@/assets/images/technician (3).png";
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { useState } from 'react';
import LogInModal from './auth/LogInModal';
import SignUpModal from './auth/SignUpModal';


export default function NavBar() {
    const {user, userloading, userLoadingError, mutateUser} =useAuthenticatedUser();
    const router = useRouter();
    return (
        <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top">
            <Navbar.Brand as={Link} href='/' className='d-flex gap-1'>
            <Image src={logo} alt="technician (3)" width={30} height={30}/> 
            <span className={styles.brandText}>
                HandyJuan
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
               
                {user?  <LoggedIniew/> : <LoggedOutiew/>}
            </Navbar.Collapse>
        </Navbar>
    );
}

function LoggedIniew() {
    const router = useRouter();
    
    return (
        <Nav.Link as={Link} href='/blog/new-post' 
                    active={router.pathname==="/blog/new-post"} 
                    className='link-primary d-flex align-items-center gap-1'>
                    <FiEdit/>
                    New Order
                    </Nav.Link>

    );
}

function LoggedOutiew (){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    
    return (
       <>
       <Nav className='ms-auto'></Nav>
       <div className='d-flex justify-content-center justify-content-md-start'>
       <Button
       variant='outline-primary'
       className='ms-md-2 mt-2 mt-md-0 ms-3'
       onClick={()=> setShowLoginModal(true)}>
        Log In
       </Button>
       <Button 
       onClick={()=> setShowSignUpModal(true)}
       className='ms-md-2 mt-2 mt-md-0 ms-3 me-3'>
              Sign Up
       </Button>
       
       {
        showLoginModal && <LogInModal 
        onDismiss={() => setShowLoginModal(false)}
        onSignUpInsteadClicked= {()=>{ setShowLoginModal(false); setShowSignUpModal(true);}}
        onForgotPasswordClicked= {()=>{}}
        
       />
       
        }
        {
            showSignUpModal && <SignUpModal 
            onDismiss={() => setShowSignUpModal(false)}
            onLoginInsteadClicked= {()=>{ setShowSignUpModal(false); setShowLoginModal(true);}}
            />
        }
        </div>
       </>
    );
}

