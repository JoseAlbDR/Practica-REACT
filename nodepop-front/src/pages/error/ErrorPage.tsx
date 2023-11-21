import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

import notFound from '../../assets/images/not-found.svg';
import errorImage from '../../assets/images/error_page.svg';
import { getError } from '../../utils/getError';

const StyledErrorPage = styled.main<{ $type: string }>`
  min-height: 100vh;
  text-align: center;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90vw;

    max-width: ${(props) => (props.$type === 'error' ? '300px' : '600px')};
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
  const error = useRouteError();
  const currentError = getError(error);

  if (currentError.status && currentError.status === 404) {
    return (
      <StyledErrorPage $type="notfound">
        <div>
          <img src={notFound} alt="not found" className="img" />
          <h3>{currentError.message}</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to="/"> Bring me back Home</Link>
        </div>
      </StyledErrorPage>
    );
  }
  return (
    <StyledErrorPage $type="error">
      <div>
        <img src={errorImage} alt="error" className="img" />
        <h3>{currentError.message}</h3>
        <p>There was an error, try again later</p>
        <Link to="/">Bring me Home</Link>
      </div>
    </StyledErrorPage>
  );
};

export default ErrorPage;
