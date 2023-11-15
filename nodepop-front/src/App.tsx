import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

// Actions
import { action as signupAction } from './pages/auth/Signup';
import { action as loginAction } from './pages/auth/Login';

// Loaders
import { loader as currentUserLoader } from './pages/adverts/Adverts';

import Landing from './pages/landing/Landing';
import Adverts from './pages/adverts/Adverts';

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
        element: <Adverts />,
        loader: currentUserLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
