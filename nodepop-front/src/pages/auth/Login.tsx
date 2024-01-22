import { toast } from 'react-toastify';
import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
} from 'react-router-dom';

import StyledLogin from './styles/AuthWrapper';
import { Logo } from '../../components/';

import { FormRow, SubmitButton } from '../../components';
import { ErrorComponent } from '../../components/shared/';

import { CustomAxiosError } from '../../api/customFetch';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { store } from '../../main';
import { authLogin, authRememberMe } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../store/selectors';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') ? true : false;

  try {
    store.dispatch(authLogin({ email, password }, rememberMe));
    return null;
  } catch (error) {
    if (error instanceof CustomAxiosError) {
      toast.error(error.message);
    }
    return error;
  }
};

const getErrorMessage = (isError: CustomAxiosError) => {
  return isError.message === 'Unauthorized'
    ? 'Wrong username/password'
    : isError.message;
};

const Login = () => {
  const isError = useActionData() as CustomAxiosError;

  const dispatch = useDispatch();

  const { isLoading } = useCustomNavigation();
  const { rememberMe } = useSelector(getAuth);
  const errorMessage = isError && getErrorMessage(isError);

  const handleRememberMe = () => {
    dispatch(authRememberMe());
  };

  return (
    <StyledLogin>
      <Form method="post" className="form">
        {isError && <ErrorComponent message={errorMessage} />}
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="test@test.com"
          disabled={isLoading}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="test"
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
      </Form>
    </StyledLogin>
  );
};

export default Login;
