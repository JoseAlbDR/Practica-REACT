import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';

import { action as signupAction } from './pages/auth/Signup';
import { action as loginAction } from './pages/auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Signup />,
        errorElement: <ErrorPage />,
        action: signupAction,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
