import { toast } from 'react-toastify';
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import StyledLogin from './styles/AuthWrapper';

import { Logo, FormRow, SubmitButton } from '../../components';
import { login } from './service';
import { useAuth } from '../../context/AuthContext';
import ErrorComponent from '../../components/shared/ErrorComponent';
import { CustomAxiosError } from '../../api/customFetch';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') ? true : false;

  try {
    await login({ email, password }, rememberMe);
    toast.success('User Succesfully Logged In');
    return redirect('/adverts');
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
  const { rememberMe, toggleRememberMe } = useAuth();
  const isError = useActionData() as CustomAxiosError;
  const errorMessage = isError && getErrorMessage(isError);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // useRememberUser(true);

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
          defaultValue="yusepah@gmail.com"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="mekieros"
          disabled={isSubmitting}
        ></FormRow>
        <div className="check-form-row">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={() => toggleRememberMe(!rememberMe)}
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
