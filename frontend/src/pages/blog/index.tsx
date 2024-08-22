import Head from 'next/head'
import { Button } from 'react-bootstrap'

export default function BlogPage(){
    return(
        <>
        <Head>
        <title>blog page</title>
        <meta name="description" content="my blog space" />
        
      </Head>
        <div>
            Hello, BLog
        </div>
        <div><Button>button</Button></div>
        <div><a href='#'>link</a></div>
        </>
    )
}