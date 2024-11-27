import { ReactNode, useState } from "react";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import ResetPasswordModal from "./ResetPasswordModal";
import { createContext } from 'react';


interface AuthModalsContext{
    showLoginModal: ()=> void;
  
    showSignUpModal: ()=> void;
  
    showForgotPasswordModal: ()=> void;
    
}

export const AuthModalsContext = createContext<AuthModalsContext>({
    showLoginModal: () => { throw Error ("AuthModal Context not implemented")},
    showSignUpModal: () => { throw Error ("AuthModal Context not implemented")},
    showForgotPasswordModal: () => { throw Error ("AuthModal Context not implemented")},
    
});


interface AuthModalsProviderProps {
    children: ReactNode;
}

export default function AuthModalsProvider({ children }: AuthModalsProviderProps) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); 

    const [value] = useState( {
        showLoginModal: () => setShowLoginModal(true),
      
        showSignUpModal: () => setShowSignUpModal(true),
        
        showForgotPasswordModal: () => setShowForgotPasswordModal(true),
       
    });
    return ( 
    <AuthModalsContext.Provider value={value}>
    
    {children}
    
        {
        showLoginModal && <LogInModal 
        onDismiss={() => setShowLoginModal(false)}
        onSignUpInsteadClicked= {()=>{ setShowLoginModal(false); setShowSignUpModal(true);}}
        onForgotPasswordClicked= {()=>{
            setShowLoginModal(false);
            setShowForgotPasswordModal(true);
        }}
        
       />
       
        }
        {
            showSignUpModal && <SignUpModal 
            onDismiss={() => setShowSignUpModal(false)}
            onLoginInsteadClicked= {()=>{ setShowSignUpModal(false); setShowLoginModal(true);}}
            />
        }
        {
            showForgotPasswordModal &&
            <ResetPasswordModal
            onDismiss={()=> setShowForgotPasswordModal(false)}
            onSignUpClicked={()=>{ setShowForgotPasswordModal(false);
            setShowSignUpModal(true)
                 }
            }
            />

         
        }
    </AuthModalsContext.Provider>
    );

}