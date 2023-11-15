import { useRouteError } from 'react-router-dom';
import { getError } from '../../utils/getError';
import notFound from '../../assets/images/not-found.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledErrorPage = styled.main`
  min-height: 100vh;
  text-align: center;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90vw;
    max-width: 600px;
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
      <StyledErrorPage>
        <div>
          <img src={notFound} alt="not found" className="img notfound-img" />
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to="/"> Bring me back Home</Link>
        </div>
      </StyledErrorPage>
    );
  }
  return (
    <StyledErrorPage>
      <div>
        <h3>Something wet wrong</h3>
        <p>{currentError.msg}</p>
      </div>
    </StyledErrorPage>
  );
};

export default ErrorPage;
