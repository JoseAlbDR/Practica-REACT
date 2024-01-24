import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginPage from '../Login';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { authLogin } from '../../../store/actions';

jest.mock('../../../store/actions');

describe('LoginPage', () => {
  const state = { ui: { isFetching: false, error: null } };
  const store = {
    getState: () => state,
    dispatch: () => {},
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action', () => {
    const username = 'tester';
    const password = 'test';
    renderComponent();

    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    // expect(submitButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    // expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ username, password });
  });
});
