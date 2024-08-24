import { Container } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';
export default function Footer(){
return(
    <footer className={styles.footer}>
        <Container>
            <p>©{new Date().getFullYear()} HandyJuan Group of bussinesses</p>
            <div className={styles.footerContent}>
                
                <div className={styles.footerColumn}>
                    <h4>Services</h4>
                    <ul>
                        <li>Plumbing</li>
                        <li>Electrical</li>
                        <li>Carpentry</li>
                        <li>Painting</li>
                        <li>General Repairs</li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h4>Contact</h4>
                    <ul>
                        <li>Phone: 08012345678</li>
                        <li>Email: getaquilityservice@handyjuan.com</li> 
                        </ul>
                </div>
                </div>
        </Container>

    </footer>
)
};