import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Wrapper from './styles/NavbarWrapper';
import { Logo } from '..';

import { useAuth } from '../../context/AuthContext';
import { logout } from '../../pages/auth/service';
import { useUser } from '../../context/UserContext';
import Modal from '../shared/Modal';
import ConfirmLogout from '../shared/ConfirmModal';
import NavButton from '../shared/NavButton';

const NavBar = () => {
  const { toggleLogged } = useAuth();
  const { user } = useUser();

  const navigate = useNavigate();

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
          <div className="nav-links">
            <NavButton to="/adverts" name="All Adverts" />
            <NavButton to="/adverts/new" name="New Advert" />
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
          </div>
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavBar;
