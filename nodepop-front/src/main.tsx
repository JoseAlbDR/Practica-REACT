import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { storage } from './utils/storage.ts';
import { setAuthorizationHeader } from './api/customFetch.ts';

import configureStore from './store/index.ts';

import { Provider } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';

// Pages
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';

import Landing from './pages/landing/Landing';
import AllAdverts from './pages/adverts/AllAdverts';
import CreateAdvert from './pages/adverts/CreateAdvert';

// Actions
import { action as signupAction } from './pages/auth/Signup';
import Login, { action as loginAction } from './pages/auth/Login';
import { action as createAdvertAction } from './pages/adverts/CreateAdvert';

// Loaders
import { loader as tagsLoader } from './pages/layout/AdvertsLayout';
import { loader as advertsLoader } from './pages/adverts/AllAdverts';
import { loader as advertDetailLoader } from './pages/adverts/AdvertDetail';

// Layouts
import AppLayout from './pages/layout/AppLayout';
import AdvertsLayout from './pages/layout/AdvertsLayout';
import AdvertDetail from './pages/adverts/AdvertDetail';

import type { Router } from '@remix-run/router';
import RequireAuth from './pages/auth/RequireAuth.tsx';
import { ReduxState } from './interfaces/state.interface.ts';

const accessToken = storage.get('accessToken');
const remember = storage.get('rememberUser');

const initialState: ReduxState = {
  auth: {
    isLoggedIn: !!accessToken,
    rememberMe: !!remember,
  },
  adverts: {
    loaded: false,
    data: [],
  },
  tags: [],
};

export const store = configureStore({ ...initialState });

const router: Router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'signup',
        element: <Signup />,
        action: signupAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(store),
      },
      // Protected routes
      {
        path: 'adverts',
        element: (
          <RequireAuth>
            <AdvertsLayout />
          </RequireAuth>
        ),
        loader: tagsLoader(store),
        children: [
          {
            index: true,
            element: <AllAdverts />,
            loader: advertsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: 'new',
            element: <CreateAdvert />,
            action: createAdvertAction,
            errorElement: <ErrorPage />,
          },
          {
            path: ':id',
            element: <AdvertDetail />,
            loader: advertDetailLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <App router={router} />
    </Provider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);
