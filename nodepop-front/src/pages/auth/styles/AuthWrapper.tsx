import styled from 'styled-components';
import bothSides from '../../../assets/images/both_sides.svg';

export const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
  form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
    background-color: rgba(255, 255, 255, 0.9);
    .check-form-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    label {
      text-transform: capitalize;
    }

    .logo {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.4rem;
    }

    h4 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .btn {
      margin-top: 1rem;
    }

    p {
      margin-top: 1rem;
      text-align: center;
      letter-spacing: var(--letter-spacing);
    }

    a {
      color: var(--primary-600);
      margin-left: 0.5rem;
      font-weight: 700;
    }
  }

  background-image: url(${bothSides});
  background-repeat: repeat-x;
  background-size: cover;
  background-position-x: center;

  @media (width > 1400px) {
    background-size: contain;
  }
`;

export default Wrapper;
