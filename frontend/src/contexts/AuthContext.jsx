import { createContext, useContext, useState } from 'react';
import { ToasterContext } from './ToasterContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { toaster } = useContext(ToasterContext);

  const signup = async (formState) => {
    try {
      const res = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
        credentials: 'include',
      });

      const { message, token, user } = await res.json();
      setUser(user);
      localStorage.setItem('token', token);
      toaster.success(`Welcome on Board, ${user.firstName}!`);
      navigate('/books');
    } catch (error) {
      console.log(error);
      toaster.error('Something went wrong. Please try again');
    }
  };

  const login = async (formData) => {
    try {
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const { message, token, user } = await res.json();
      setUser(user);
      localStorage.setItem('token', token);
      toaster.success(`Welcome back, ${user.firstName}!`);
      navigate('/books');
    } catch (error) {
      console.log(error);
      toaster.error('Something went wrong. Please try again');
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:8000/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const { message } = await res.json();
      setUser(null);
      localStorage.removeItem('token');
      navigate('/');
      toaster.success(message);
    } catch (error) {
      console.log(error);
      toaster.error('Something went wrong. Please try again');
    }
  };

  useEffect(() => {
    console.log('REFRESH');
  }, []);

  return <AuthContext.Provider value={{ user, setUser, signup, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
