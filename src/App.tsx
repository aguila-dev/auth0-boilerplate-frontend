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
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        await axios.post(
          'http://localhost:8080/auth/signup',
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
        <>
          <p>Welcome, {user?.name}</p>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
