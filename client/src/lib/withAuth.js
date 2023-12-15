import { useEffect } from "react";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import { getCookie } from "@/lib/cookie";
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    
  
    const router = useRouter();
    
    const isAuth = true;

    useEffect(() => {
      if (!getCookie("key")) {
        router.replace("/auth/login");
      }
    }, []);

   

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
