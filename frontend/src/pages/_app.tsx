

import '@/styles/globals.scss';
import '@/styles/utils.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { Container, Navbar, SSRProvider } from 'react-bootstrap';
import styles from "@/styles/App.module.css";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import { Sign } from 'crypto';
import SignUpModal from '@/components/auth/SignUpModal';
import LogInModal from '@/components/auth/LogInModal';
import { on } from 'events';


const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
return(
<>
    <Head>
        <title>HandyJuan Official Website</title>
        <meta name="description" content="my production level app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />     
     </Head>
      <SSRProvider>
      <div className={inter.className}>

        <NextNProgress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}    
         />
        <NavBar/>
        <main>
          <Container className={styles.pageContainer}> 
            <Component {...pageProps} />
          </Container>
       </main>
       <Footer/>
       <LogInModal
       onDismiss={()=> { }}
       onSignUpInsteadClicked={()=>{ }}
      onForgotPasswordClicked={()=>{ }}
    
       />
     </div>
     </SSRProvider>
</>

   );
 
  }
