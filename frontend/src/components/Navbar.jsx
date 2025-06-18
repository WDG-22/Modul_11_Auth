import { Link } from 'react-router-dom';
import VisitorMenu from './VisitorMenu';
import UserMenu from './UserMenu.jsx';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link to={'/'} className='btn btn-ghost text-xl'>
          PersonalLibrary
        </Link>
      </div>
      <div className='flex gap-2'>{user ? <UserMenu /> : <VisitorMenu />}</div>
    </header>
  );
};

export default Navbar;
