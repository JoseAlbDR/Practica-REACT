import { Form, useNavigation } from 'react-router-dom';
import StyledSignup from '../AuthWrapper';
import Logo from '../../../components/Logo';
import FormRow from '../../../components/form/FormRow';
import SubmitButton from '../../../components/SubmitButton';
import { Link } from 'react-router-dom';

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
          name="userpassword"
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
