import { createContext, useState, useEffect } from 'react';
import { useAuthentication, useUser } from '../hooks/ApiHooks';
import { useNavigate, useLocation } from 'react-router-dom';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    try {
      const loginData = await postLogin(credentials);
      localStorage.setItem('token', loginData.token);
      const userData = await getUserByToken(loginData.token);
      setUser(userData.user);
      navigate('/');
    } catch (e) {
      console.log(e.message);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getUserByToken(token);
        setUser(userData.user);
        navigate(location.pathname);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
