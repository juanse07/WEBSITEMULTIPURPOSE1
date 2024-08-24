import Head from 'next/head'
import { Button } from 'react-bootstrap'

export default function BlogPage(){
    return(
        <>
        <Head>
        <title>HandyJuan Official website - about us</title>
        <meta name="description" content="my blog space" />
        
      </Head>
        <div>
            Hello, this is HandyJuan your skilled handyman
        </div>
        <div><Button>button</Button></div>
        <div><a href='#'>link</a></div>
        </>
    )
}