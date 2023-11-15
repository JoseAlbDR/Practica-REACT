import { useLoaderData } from 'react-router-dom';
import Wrapper from './styles/NavBarWrapper';
import { Logo } from '..';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = useLoaderData();

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
              <button className="btn btn-hipster menu-btn">Logout</button>
            </>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavBar;
