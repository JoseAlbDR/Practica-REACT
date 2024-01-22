import Wrapper from './styles/NavbarWrapper';

import {
  Modal,
  ConfirmModal as ConfirmLogout,
  NavButton,
  Logo,
} from '../shared/';
import { useDispatch } from 'react-redux';
import { loginOut } from '../../store/actions';
import { toast } from 'react-toastify';

const NavBar = () => {
  const dispatch = useDispatch();

  const handleLogoutUser = async () => {
    toast.success('User logged out');
    dispatch(loginOut());
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
