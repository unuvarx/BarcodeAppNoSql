import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/login');
      }
    }, []);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;