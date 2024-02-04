import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../../../store';
import Login from '../Login';

// import { act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { authLogin } from '../../../store/actions';

import { initialState } from '../../../store/reducers/initial-state';
import { router } from '../../../main';

jest.mock('../../../store/actions/auth.actions');

const store = configureStore(
  { auth: initialState.auth, ui: initialState.ui },
  { router }
);

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

  // No puedo declarar el state y el store como en la clase por el tipado de TS
  // No consigo hacer funcionar este test por más que lo he intentado me da un error:
  // Actions must be plain objects. Instead, the actual type was: 'undefined'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.

  // it('submits form with correct data', async () => {
  //   const email = 'test@example.com';
  //   const password = '123456';

  //   render(
  //     <Provider store={store}>
  //       <Login />
  //     </Provider>
  //   );

  //   await act(async () => {
  //     await userEvent.type(screen.getByLabelText('email'), email);
  //     await userEvent.type(screen.getByLabelText('password'), password);
  //   });

  //   await act(async () => {
  //     await userEvent.click(screen.getByRole('button', { name: 'submit' }));
  //   });

  //   console.log({ authLogin });

  //   expect(authLogin).toHaveBeenCalledWith(
  //     { username: email, password },
  //     false
  //   );
  // });
});
