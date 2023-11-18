import { toast } from 'react-toastify';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import Wrapper from './styles/NavbarWrapper';
import { Logo } from '..';

import { useAuth } from '../../context/AuthContext';
import { logout } from '../../pages/auth/service';
import { useUser } from '../../context/UserContext';
import Modal from '../shared/Modal';
import ConfirmLogout from '../shared/ConfirmModal';

const NavBar = () => {
  const { isLogged, toggleLogged } = useAuth();
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname.split('/').at(-1);

  const handleLogout = async () => {
    try {
      await logout();
      toggleLogged(false);
      toast.success(`User ${user?.name} successfully logged out`);
      navigate('/login');
    } catch (error) {
      console.log(error);
      throw error;
    }
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
              <Modal>
                <Modal.Open opens="logout">
                  <button className="btn btn-hipster menu-btn">Logout</button>
                </Modal.Open>
                <Modal.Window name="logout">
                  <ConfirmLogout
                    type="logout"
                    resourceName=""
                    onConfirm={handleLogout}
                  />
                </Modal.Window>
              </Modal>
            </>
          )}
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavBar;
