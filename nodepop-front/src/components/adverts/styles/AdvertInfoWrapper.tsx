import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex: 1;
  svg {
    color: var(--text-secondary-color);
  }

  .advert-icon {
    font-size: 2rem;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .advert-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;

export default Wrapper;
