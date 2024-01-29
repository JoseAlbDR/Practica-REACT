import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../main';
import Login from '../Login';
import userEvent from '@testing-library/user-event';
jest.mock('../../../store/actions/');

describe('Login Component', () => {
  it('renders Login component', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const email = 'test@example.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const userType = (input: Element, text: string) =>
      userEvent.type(input, text);
    const usernameInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    // fireEvent.change(screen.getByLabelText('email'), {
    //   target: { value: email },
    // });

    await act(() => userType(usernameInput, email));

    // fireEvent.change(screen.getByLabelText('password'), {
    //   target: { value: password },
    // });

    await act(() => userType(passwordInput, password));

    // fireEvent.click(screen.getByRole('checkbox', { name: '' }));

    // fireEvent.submit(screen.getByRole('button', { name: 'submit' }));

    await userEvent.click(submitButton);
  });
});
