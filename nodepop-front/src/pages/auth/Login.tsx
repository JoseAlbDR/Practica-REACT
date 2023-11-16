import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from 'react-router-dom';
import StyledSignup from './styles/AuthWrapper';
import Logo from '../../components/Logo';
import FormRow from '../../components/form/FormRow';
import SubmitButton from '../../components/SubmitButton';
import { Link } from 'react-router-dom';
import { login } from './service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await login({ email, password });
    toast.success('User Succesfully Logged In');
    return redirect('/main');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error('Wrong Username or Password');
    }
    console.log({ error });
    return error;
  }
};

const Signup = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <StyledSignup>
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
        <SubmitButton formBtn />
        <p>
          Not a Member Yet?
          <Link to="/signup" className="member-btn">
            Signup
          </Link>
        </p>
        <p>
          Want to explore? Go
          <Link to="/main" className="member-btn">
            Home
          </Link>
        </p>
      </Form>
    </StyledSignup>
  );
};

export default Signup;
