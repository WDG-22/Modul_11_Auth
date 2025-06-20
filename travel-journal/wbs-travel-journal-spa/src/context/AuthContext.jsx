import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      const res = await fetch(import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL + `/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setUser(data.user);
      navigate('create');
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (formData) => {
    try {
      const res = await fetch(import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL + `/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setUser(data.user);
      console.log(data.user);
      navigate('create');
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_APP_TRAVEL_JOURNAL_API_URL + `/auth/signout`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ user, signin, signup, signout }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
