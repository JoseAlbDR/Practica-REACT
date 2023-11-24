import Wrapper from './styles/NavbarWrapper';
import { useNavigate } from 'react-router-dom';

import {
  Modal,
  ConfirmModal as ConfirmLogout,
  NavButton,
  Logo,
} from '../shared/';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { onLogout } = useAuth();
  const { user } = useUser();

  const handleLogoutUser = async () => {
    await onLogout(navigate, user);
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
              <Modal.Open
                opens="logout"
                render={(openModal) => (
                  <button
                    className="btn btn-hipster menu-btn"
                    onClick={openModal}
                  >
                    Logout
                  </button>
                )}
              />
              <Modal.Window
                name="logout"
                render={(closeModal) => (
                  <ConfirmLogout
                    type="logout"
                    resourceName=""
                    onCloseModal={closeModal}
                    onConfirm={handleLogoutUser}
                  />
                )}
              ></Modal.Window>
            </Modal>
          </div>
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavBar;
