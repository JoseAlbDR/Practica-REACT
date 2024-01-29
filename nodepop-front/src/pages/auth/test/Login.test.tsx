import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from '../Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

jest.mock('../../store/actions');

const userType = (input: Element, text: string) => {
  userEvent.type(input, text);
};

// Mock Redux store and useDispatch
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// // Mock react-router-dom useNavigate
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

describe('Login Component', () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  const initialState = { ui: { isFetching: false, error: null } };

  const store = createStore((state) => state, initialState);

  it('renders login form correctly', () => {
    console.log({ store });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByText('Remember Me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByText('Not a Member Yet?')).toBeInTheDocument();
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });

  // it('handles form submission', () => {
  //   render(<Login />);
  //   const emailInput = screen.getByLabelText('email');
  //   const passwordInput = screen.getByLabelText('password');
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });

  //   const mockDispatch = jest.fn();
  //   (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  //   userEvent.type(emailInput, 'test@example.com');
  //   userEvent.type(passwordInput, 'password123');

  //   fireEvent.click(submitButton);

  //   expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  // });

  // it('handles remember me checkbox', () => {
  //   render(<Login />);
  //   const rememberMeCheckbox = screen.getByRole('checkbox', {
  //     name: 'Remember Me',
  //   });

  //   const mockDispatch = jest.fn();
  //   (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  //   fireEvent.click(rememberMeCheckbox);

  //   expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

  // });
});
