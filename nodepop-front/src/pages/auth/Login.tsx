import { Link, useNavigate } from 'react-router-dom';

import StyledLogin from './styles/AuthWrapper';
import { Logo } from '../../components/';

import { FormRow, SubmitButton } from '../../components';

import { authLogin, authRememberMe } from '../../store/actions';
import { useSelector } from 'react-redux';
import { getAuth, getUi } from '../../store/selectors';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../main';
import { getError } from '../../utils';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isFetching, error } = useSelector(getUi);
  const { rememberMe, isLoggedIn } = useSelector(getAuth);

  let renderError = '';

  if (error) renderError = getError(error).message;

  useEffect(() => {
    if (isLoggedIn) navigate('/adverts');
  }, [isLoggedIn, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authLogin(credentials, rememberMe));
  };

  const handleRememberMe = () => {
    dispatch(authRememberMe());
  };

  return (
    <StyledLogin>
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue=""
          onChange={handleChange}
          disabled={isFetching}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue=""
          onChange={handleChange}
          disabled={isFetching}
        ></FormRow>
        <div className="check-form-row">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            disabled={isFetching}
            onChange={handleRememberMe}
          />
          Remember Me
        </div>
        <SubmitButton formBtn />
        {error && <div className="alert alert-danger">{renderError}</div>}
        <p>
          Not a Member Yet?
          <Link to="/signup" className="member-btn">
            Signup
          </Link>
        </p>
        <p>
          <Link to="/" className="member-btn">
            Landing Page
          </Link>
        </p>
      </form>
    </StyledLogin>
  );
};

export default Login;
