import styled from 'styled-components';

const Wrapper = styled.section`
  .adverts {
    display: grid;
    grid-template-columns: 1fr;
  }
  .adverts-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (width > 992px) {
    .adverts {
      grid-template-columns: auto 1fr;
    }
    .adverts-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
