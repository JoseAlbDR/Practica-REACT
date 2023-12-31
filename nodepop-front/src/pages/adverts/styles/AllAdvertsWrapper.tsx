import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;

  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .adverts {
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .create-link {
    color: var(--primary-700);
    text-decoration: underline;
  }

  @media (width > 992px) {
    width: 90%;
  }
`;

export default Wrapper;
