import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/signup/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
