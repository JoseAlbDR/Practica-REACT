import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { storage } from './utils/storage.ts';
import { setAuthorizationHeader } from './api/customFetch.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import configureStore from './store/index.ts';
import { Provider } from 'react-redux';

const accessToken = storage.get('accessToken');

const remember = storage.get('rememberUser');

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: '*', element: <App /> }]);

export const store = configureStore(
  {
    auth: { isLoggedIn: !!accessToken, rememberMe: !!remember },
  },
  { router }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);
