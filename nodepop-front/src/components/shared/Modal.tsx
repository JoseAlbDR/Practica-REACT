import { ClickAwayListener } from '@mui/material';
import {
  createContext,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--grey-100);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-3);
  padding: 3.2rem 4rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius);
  transform: translateX(0.8rem);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  cursor: pointer;

  &:hover {
    background-color: var(--grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--grey-500);
  }
`;

interface ModalContextProps {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

// 1 Create a context
const ModalContext = createContext<ModalContextProps>({
  openName: '',
  close: () => {},
  open: () => {},
});

// 2 Create a parent component
const Modal = ({ children }: { children: ReactElement[] }) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

// 3 Create child components to help implementing the common tasks
export const Open = ({
  render,
  opens: opensWindowName,
}: {
  render: (openModal: () => void) => ReactNode;
  opens: string;
}) => {
  const { open } = useContext(ModalContext);

  return render(() => open(opensWindowName));
  // return cloneElement(children, { onClick: () => open(opensWindowName) });
};

export const Window = ({
  render,
  name,
}: {
  render: (closeModal: () => void) => ReactNode;
  name: string;
}) => {
  const { openName, close } = useContext(ModalContext);
  // const modalRef = useCloseModal(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <ClickAwayListener onClickAway={close}>
        {/* <StyledModal ref={modalRef}> */}
        <StyledModal>
          <Button onClick={close}>
            <HiXMark />
          </Button>
          {render(() => close())}
        </StyledModal>
      </ClickAwayListener>
    </Overlay>,
    // React portal
    document.body
  );
};

export default Modal;
