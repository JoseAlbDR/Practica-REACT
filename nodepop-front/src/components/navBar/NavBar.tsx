import { toast } from 'react-toastify';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import Wrapper from './styles/NavBarWrapper';
import { Logo } from '..';

import { useAuth } from '../../context/AuthContext';
import { logout } from '../../pages/auth/service';
import { useUser } from '../../context/UserContext';

const NavBar = () => {
  const { isLogged, toggleLogged } = useAuth();
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname.split('/').at(-1);

  const onLogout = async () => {
    await logout();
    toggleLogged(false);
    toast.success(`User ${user?.name} successfully logged out`);
    navigate('/login');
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <ul className="nav-items">
          <Logo />
          {!isLogged ? (
            <>
              <Link to="/login" className="btn menu-btn">
                Login
              </Link>
              <Link to="/signin" className="btn menu-btn">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`${currentLocation === 'new' ? '/adverts' : 'new'}`}
                className="btn menu-btn"
              >
                {currentLocation === 'new' ? 'Advert List' : 'Create Advert'}
              </Link>
              <button onClick={onLogout} className="btn btn-hipster menu-btn">
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavBar;
