import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from 'react-router-dom';
import StyledSignup from '../AuthWrapper';
import Logo from '../../../components/Logo';
import FormRow from '../../../components/form/FormRow';
import SubmitButton from '../../../components/SubmitButton';
import { Link } from 'react-router-dom';
import { signup } from '../service';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    const response = await signup({ email, name, username, password });
    console.log(response);
    toast.success('User Succesfully Created');
    return redirect('/login');
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error('User Already Exist');
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
        <h4>Sign Up</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="yusepah@gmail.com"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="text"
          name="username"
          labelText="user name"
          defaultValue="yusep"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="mekieros"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="text"
          name="name"
          labelText="name"
          defaultValue="J.Alberto"
          disabled={isSubmitting}
        ></FormRow>
        <SubmitButton />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </StyledSignup>
  );
};

export default Signup;
