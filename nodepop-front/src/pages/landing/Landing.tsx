import { Link } from 'react-router-dom';

import StyledLanding from './LandingWrapper';
import main from '../../assets/images/main.svg';
import { Logo } from '../../components';

const Landing = () => {
  return (
    <StyledLanding>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Second <span>hand</span> shop
          </h1>
          <p>
            Welcome to our second-hand shop treasure tracker, your ultimate
            companion in the world of thrifting! Discover hidden gems, manage
            your finds, and never miss a unique bargain. Simplify your
            second-hand shopping journey with us today.
          </p>
          <Link to="/signup" className="btn register-link">
            Signup
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </StyledLanding>
  );
};

export default Landing;
