import { Spinnaker } from 'next/font/google';
import {ReactNode} from 'react';

import { Button, ButtonProps, Spinner } from 'react-bootstrap';


interface LoadingButtonProps 
{
    isloading: boolean;
    children: React.ReactNode;
    
}

export default function LoadingButton({ isloading, children, ...props}: LoadingButtonProps & ButtonProps) {
  return (
    <Button {...props} disabled={isloading}>
        {isloading &&
        <>
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
           
        />
        <span className="visually-hidden">Loading...</span>
        {" "}
        </>
    }
      {
     children
       }
      </Button>
  );
}