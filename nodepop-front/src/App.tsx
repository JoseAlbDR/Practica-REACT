import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Pages
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';
const Login = lazy(() => import('./pages/auth/Login'));
import Landing from './pages/landing/Landing';
import AllAdverts from './pages/adverts/AllAdverts';
import CreateAdvert from './pages/adverts/CreateAdvert';

// Actions
import { action as signupAction } from './pages/auth/Signup';
import { action as loginAction } from './pages/auth/Login';
import { action as createAdvertAction } from './pages/adverts/CreateAdvert';

// Loaders
import { loader as currentUserLoader } from './pages/layout/AdvertsLayout';
import { loader as advertsLoader } from './pages/adverts/AllAdverts';
import { loader as advertDetailLoader } from './pages/adverts/AdvertDetail';

// Layouts
import AppLayout from './pages/layout/AppLayout';
import AdvertsLayout from './pages/layout/AdvertsLayout';
import AdvertDetail from './pages/adverts/AdvertDetail';
import { Skeleton } from '@mui/material';

const router = createBrowserRouter([
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
        element: (
          <Suspense
            fallback={
              <Skeleton variant="rectangular" width={210} height={118} />
            }
          >
            <Login />
          </Suspense>
        ),
        action: loginAction,
      },
      // Protected routes
      {
        path: 'adverts',
        element: <AdvertsLayout />,
        loader: currentUserLoader,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
