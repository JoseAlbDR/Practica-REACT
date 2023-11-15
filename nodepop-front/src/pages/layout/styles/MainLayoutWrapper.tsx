import styled from 'styled-components';

const Wrapper = styled.section`
  .main {
    display: grid;
    grid-template-rows: auto 1fr;
    place-items: center;
  }
  .main-page {
    width: 100vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (width > 768px) {
    .main-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
