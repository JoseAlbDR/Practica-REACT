import { toast } from 'react-toastify';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';

import Wrapper from './styles/NavBarWrapper';
import { Logo } from '..';
import { IUser } from '../../interfaces/auth.interfaces';
import { storage } from '../../utils';

const NavBar = () => {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname.split('/').at(-1);

  const logout = () => {
    storage.remove('accessToken');
    toast.success(`User ${user.name} successfully logged out`);
    navigate('/login');
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <ul className="nav-items">
          <Logo />
          {!user ? (
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
              <button onClick={logout} className="btn btn-hipster menu-btn">
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
