import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  background: var(--background-secondary-color);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 999;
  width: 100vw;
  position: sticky;
  top: 0;

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .nav-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    img {
      max-width: 30%;
    }
  }

  .menu-btn {
    text-align: center;
  }

  @media (width > 425px) {
    .menu-btn {
      min-width: 135px;
    }
  }
`;

export default Wrapper;
