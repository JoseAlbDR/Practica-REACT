import Wrapper from './styles/NavbarWrapper';
import { Logo } from '..';

import Modal from '../shared/Modal';
import ConfirmLogout from '../shared/ConfirmModal';
import NavButton from '../shared/NavButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const handleLogoutUser = async () => {
    await onLogout(navigate);
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
                  onConfirm={handleLogoutUser}
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
