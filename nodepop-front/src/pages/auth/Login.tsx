import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  ActionFunctionArgs,
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import StyledLogin from './styles/AuthWrapper';
import { storage } from '../../utils';

import { Logo, FormRow, SubmitButton } from '../../components';
import { login } from './service';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rememberMe = formData.get('rememberMe') ? true : false;

  try {
    await login({ email, password }, rememberMe);
    toast.success('User Succesfully Logged In');
    return true;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.statusCode === 401)
        toast.error('Wrong Username or Password');
      else toast.error('Ups! There was an error, try again later');
    }
    console.log({ error });
    return false;
  }
};

const Login = () => {
  const [remember, setRemember] = useState(false);
  const isLogged = useActionData() as boolean;
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { toggleLogged } = useAuth();
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (storage.get('accessToken')) {
      setRemember(true);
    } else setRemember(false);
  }, []);

  useEffect(() => {
    if (isLogged) navigate('/adverts');
    toggleLogged(isLogged);
  }, [isLogged, toggleLogged, navigate]);

  return (
    <StyledLogin>
      <Form method="post" className="form">
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
            checked={remember}
            onChange={() => setRemember((remember) => !remember)}
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
