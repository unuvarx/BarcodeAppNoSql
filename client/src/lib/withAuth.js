import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCookie } from "@/lib/cookie";
import Spinner from "@/components/spinner";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
      const checkAuth = async () => {
        if (!getCookie("key")) {
          router.replace("/auth/login");
        } else {
          if (userInfo) {
            setInterval(() => {
              setLoading(false);
            }, 1000);
          }
        }
      };

      checkAuth();
    }, []);

    return loading ? <Spinner /> : <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
