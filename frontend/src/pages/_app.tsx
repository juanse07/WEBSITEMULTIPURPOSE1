

import AuthModalsProvider from '@/components/auth/AuthModalsProvider';
import NavBar from '@/components/NavBar';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import styles from "@/styles/App.module.css";
import '@/styles/globals.scss';
import '@/styles/utils.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

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
        <meta property= "og:image" content="htttps://thehandyjuan.com/social_media_preview_image.png"/> 
        <meta name="twitter:card" content='summary_large_image'/>
     </Head>
 
        <AuthModalsProvider>
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
     </AuthModalsProvider>
    
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