

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
import { use, useEffect, useState } from 'react';
import {User} from '@/models/user';
import * as UsersApi from '@/network/api/user';
import useSwr from 'swr';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })



export default function App({ Component, pageProps }: AppProps) {

  // const[user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   async function fetchUser(){
  //   try {
  //     const user = await UsersApi.getAuthenticatedUser();
  //     console.log('Current user state:', user); // Add this line to debug
  //     setUser(user);
     
  //   } catch (error) {
  //     console.error(error);
      
  //   }
  // }
  // fetchUser();
   
  // }, []);

 // const {user, userloading, userLoadingError, mutateUser} =useAuthenticatedUser(); /// removed because of the use of the useSWR hook
useOnboardingRedirect();
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
       {/* <Footer/> */}
      
     </div>
     </SSRProvider>
</>

   );
 
  }

  function useOnboardingRedirect() {
    const {user}= useAuthenticatedUser();
    const router = useRouter();
    useEffect(() => {
      if(user && !user.username && router.pathname !== '/onboarding'){
        router.push('/onboarding?returnTo=' + router.asPath);
      }
    }, [user, router]);
  }