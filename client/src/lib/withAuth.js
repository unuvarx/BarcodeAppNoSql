import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const isLoggedIn = true;

    useEffect(() => {
      if (!isLoggedIn) {
        router.replace("/auth/login");
      }
    }, []);

    if (!isLoggedIn) {
       
      return null; // don't show content of page
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
