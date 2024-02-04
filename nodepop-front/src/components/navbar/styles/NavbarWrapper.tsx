import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  background: rgb(240, 253, 250);
  background: linear-gradient(
    90deg,
    rgba(240, 253, 250, 1) 0%,
    rgba(204, 251, 241, 1) 48%,
    rgba(240, 253, 250, 1) 100%
  );
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 999;
  width: 100vw;
  position: sticky;
  top: 0;

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

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

    a {
      img {
        max-width: 100%;
      }
    }
  }

  .menu-btn {
    text-align: center;

    &:hover {
      color: var(--grey-100);
    }
  }

  @media (width > 425px) {
    .menu-btn {
      min-width: 135px;
    }
  }
`;

export default Wrapper;
