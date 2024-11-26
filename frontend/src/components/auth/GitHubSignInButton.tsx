import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { BsGithub } from "react-icons/Bs";
export default function GitHubSignInButton() {
    const router = useRouter();
    return (
       <Button
       href={process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login/github?returnTo=" + router.asPath}
       variant="dark"
       className="d-flex align-items-center justify-content-center gap-1">
              <BsGithub   
              size={24}/>
        Sign In with GitHub
       </Button>
    );
}