import { Spinner } from 'react-bootstrap';
import { User } from '@/models/user';

interface AuthorizedContentGuardProps {
  user: User | null | undefined;
  userLoading: boolean;
  authorId: string;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
}

const AuthorizedContentGuard = ({
  user,
  userLoading,
  authorId,
  children,
  loadingComponent = <Spinner animation="border" className="d-block m-auto" />,
  unauthorizedComponent = <p>You need to log in to access this content</p>
}: AuthorizedContentGuardProps) => {
  const userIsAuthorized = (user && user._id === authorId) || false;

  if (userLoading) {
    return <>{loadingComponent}</>;
  }

  if (!userLoading && !userIsAuthorized) {
    return <>{unauthorizedComponent}</>;
  }

  return <>{children}</>;
};

export default AuthorizedContentGuard;