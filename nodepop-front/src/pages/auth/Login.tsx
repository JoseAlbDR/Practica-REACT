import StyledLogin from './styles/AuthWrapper';
import { Logo } from '../../components/';

import { FormRow, SubmitButton } from '../../components';

import { authLogin, authRememberMe } from '../../store/actions';
import { useSelector } from 'react-redux';
import { getAuth, getUi } from '../../store/selectors';
import { ChangeEvent, FormEvent, useState } from 'react';

import { getError } from '../../utils';
import { useAppDispatch } from '../../main';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: 'test@test.com',
    password: 'secret',
  });

  const dispatch = useAppDispatch();
  const { isFetching, error } = useSelector(getUi);
  const { rememberMe } = useSelector(getAuth);

  let renderError = '';

  if (error) renderError = getError(error).message;

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
          required
          type="email"
          name="email"
          labelText="email"
          onChange={handleChange}
          disabled={isFetching}
          defaultValue={'test@test.com'}
        ></FormRow>
        <FormRow
          required
          type="password"
          name="password"
          labelText="password"
          onChange={handleChange}
          disabled={isFetching}
          defaultValue={'secret'}
        ></FormRow>
        <div className="check-form-row">
          <input
            type="checkbox"
            name="rememberMe"
            checked
            disabled={isFetching}
            onChange={handleRememberMe}
          />
          Remember Me
        </div>
        <SubmitButton formBtn />
        {error && <div className="alert alert-danger">{renderError}</div>}
        {/* <p>
          Not a Member Yet?
          <Link to="/signup" className="member-btn">
            Signup
          </Link>
        </p>
        <p>
          <Link to="/" className="member-btn">
            Landing Page
          </Link>
        </p> */}
      </form>
    </StyledLogin>
  );
};

export default Login;
