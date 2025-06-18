import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/signup');
  }, [user]);

  if (!user) return null;
  return <Outlet />;
};

export default ProtectedLayout;
