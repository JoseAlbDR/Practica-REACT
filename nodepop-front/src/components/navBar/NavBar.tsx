import { useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from './styles/NavBarWrapper';
import { Logo } from '..';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IUser } from '../../interfaces/auth.interfaces';

const NavBar = () => {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
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
              <Link to="/" className="btn menu-btn">
                New Advert
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
