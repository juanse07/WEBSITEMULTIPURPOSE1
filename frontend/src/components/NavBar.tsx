import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav,Navbar } from 'react-bootstrap';
import { FiEdit} from 'react-icons/fi';
import logo from "@/assets/images/technician (3).png";
import Image from 'next/image';
import styles from '@/styles/NavBar.module.css';
export default function NavBar() {
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
                    <Nav.Link as={Link} href='/blog/new-post' 
                    active={router.pathname==="/blog/new-post"} 
                    className='link-primary d-flex align-items-center gap-1'>
                    <FiEdit/>
                    New Order
                    </Nav.Link>
                    <Nav.Link as={Link} href='/contact' active={router.pathname==="/contact"}>
                                Contact</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link as={Link} href='/login' active={router.pathname==="/login"}>Login</Nav.Link>
                    <Nav.Link as={Link} href='/register' active={router.pathname==="/register"}>Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}