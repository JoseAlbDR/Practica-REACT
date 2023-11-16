import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

// Actions
import { action as signupAction } from './pages/auth/Signup';
import { action as loginAction } from './pages/auth/Login';
import { action as createAdvertAction } from './pages/adverts/CreateAdvert';

// Loaders
import { loader as currentUserLoader } from './pages/layout/MainLayout';
import { loader as allAdvertsLoader } from './pages/adverts/AllAdverts';
import { loader as tagsLoader } from './pages/adverts/CreateAdvert';

import Landing from './pages/landing/Landing';
import AppLayout from './pages/layout/AppLayout';
import MainLayout from './pages/layout/MainLayout';
import AllAdverts from './pages/adverts/AllAdverts';
import CreateAdvert from './pages/adverts/CreateAdvert';

const router = createBrowserRouter([
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
        path: '/signup',
        element: <Signup />,
        action: signupAction,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: '/adverts',
        element: <MainLayout />,
        loader: currentUserLoader,
        children: [
          {
            index: true,
            element: <AllAdverts />,
            loader: allAdvertsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: 'new',
            element: <CreateAdvert />,
            loader: tagsLoader,
            action: createAdvertAction,
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
