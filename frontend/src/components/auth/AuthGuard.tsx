import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import  useAuthenticatedUser  from '@/hooks/useAuthenticatedUser';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard = ({ children, redirectTo = "/" }: AuthGuardProps) => {
  const router = useRouter();
  const { user, userloading, userLoadingError } = useAuthenticatedUser();

  // Redirect if not authenticated and not loading
  if (!userloading && !user) {
    router.push(redirectTo);
    return null;
  }

  // Show loading spinner while checking auth status
  if (userloading) {
    return (
      <Spinner 
        animation="border" 
        className="d-block m-auto" 
        role="status"
      />
    );
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;