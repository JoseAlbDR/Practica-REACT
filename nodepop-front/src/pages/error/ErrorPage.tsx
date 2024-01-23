import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import notFound from '../../assets/images/not-found.svg';

import { getError } from '../../utils/getError';
import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';

const StyledErrorPage = styled.main<{ $type: string }>`
  min-height: 100vh;
  text-align: center;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 90vw;

    max-width: ${(props) => (props.$type === 'error' ? '400px' : '600px')};
    margin-bottom: 2rem;
    margin-top: -3rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var() (--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

const ErrorPage = () => {
  const { error } = useSelector(getUi);
  const currentError = getError(error);
  const navigate = useNavigate();

  return (
    <StyledErrorPage $type="notfound">
      <div className="error-page">
        <img src={notFound} alt="not found" className="img" />
        <h3>{currentError.message}</h3>
        <p>We can't seem to find the page you are looking for</p>
        <button className="btn btn-hipster" onClick={() => navigate('/')}>
          Bring me back
        </button>
      </div>
    </StyledErrorPage>
  );
};

export default ErrorPage;
