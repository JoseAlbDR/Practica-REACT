import Wrapper from './styles/NavbarWrapper';
import { Logo } from '..';

import { useAuth } from '../../context/AuthContext';

import Modal from '../shared/Modal';
import ConfirmLogout from '../shared/ConfirmModal';
import NavButton from '../shared/NavButton';

const NavBar = () => {
  const { logoutUser } = useAuth();

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
                  onConfirm={logoutUser}
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
