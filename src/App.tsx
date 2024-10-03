import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/Buttons/LoginButtons';
import LogoutButton from './components/Buttons/LogoutButton';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  console.log(`app is working: ${import.meta.env.MODE} mode...`);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email',
          },
        });

        console.log('authorization token', token);

        await axios.post(
          'http://localhost:8080/v1/auth/signup',
          {
            email: user?.email,
            name: user?.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isAuthenticated ? (
        <div className="flex flex-col gap-4">
          <p>Welcome, {user?.name}</p>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
