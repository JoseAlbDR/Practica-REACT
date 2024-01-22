import { Link } from 'react-router-dom';

import StyledLogin from './styles/AuthWrapper';
import { Logo } from '../../components/';

import { FormRow, SubmitButton } from '../../components';

import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { authLogin, authRememberMe } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';
import { ChangeEvent, FormEvent, useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { isLoading } = useCustomNavigation();
  const { rememberMe } = useSelector(getAuth);

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
          disabled={isLoading}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue=""
          onChange={handleChange}
          disabled={isLoading}
        ></FormRow>
        <div className="check-form-row">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            disabled={isLoading}
            onChange={handleRememberMe}
          />
          Remember Me
        </div>
        <SubmitButton formBtn />
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
