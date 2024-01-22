import { toast } from 'react-toastify';
import { ActionFunctionArgs, Form, redirect, Link } from 'react-router-dom';

import StyledSignup from './styles/AuthWrapper';

import { Logo, FormRow, SubmitButton } from '../../components';
import { signup } from './service';
import { CustomAxiosError } from '../../api/customFetch';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    await signup({ email, name, username, password });
    toast.success('User Succesfully Created');
    return redirect('/login');
  } catch (error) {
    if (error instanceof CustomAxiosError) {
      if (error.status === 500) toast.error('Try with another credentials');
      else toast.error(error.message);
    }
    return error;
  }
};

const Signup = () => {
  const { isSubmitting } = useCustomNavigation();

  return (
    <StyledSignup>
      <Form method="post" className="form">
        <Logo />
        <h4>Sign Up</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="test@test.com"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="text"
          name="username"
          labelText="user name"
          defaultValue="test"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="test"
          disabled={isSubmitting}
        ></FormRow>
        <FormRow
          type="text"
          name="name"
          labelText="name"
          defaultValue="test"
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
