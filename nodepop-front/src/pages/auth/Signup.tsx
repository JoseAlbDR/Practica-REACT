import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
  Link,
} from 'react-router-dom';

import StyledSignup from './styles/AuthWrapper';

import { Logo, FormRow, SubmitButton } from '../../components';
import { signup } from './service';

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
      toast.error(
        'There was an error, try with another user name or try again later'
      );
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
        <SubmitButton formBtn />
        <p>
          Already a member?
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/">Landing Page</Link>
        </p>
      </Form>
    </StyledSignup>
  );
};

export default Signup;
