import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import ErrorPage from './pages/error/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Landing from './pages/landing/Landing';
import AllAdverts from './pages/adverts/AllAdverts';
import CreateAdvert from './pages/adverts/CreateAdvert';

// Actions
import { action as signupAction } from './pages/auth/Signup';
import { action as loginAction } from './pages/auth/Login';
import { action as createAdvertAction } from './pages/adverts/CreateAdvert';

// Loaders
import { loader as currentUserLoader } from './components/protected/ProtectedRoute';
import { loader as allAdvertsLoader } from './pages/adverts/AllAdverts';
import { loader as tagsLoader } from './pages/adverts/CreateAdvert';
import { loader as advertDetailLoader } from './pages/adverts/AdvertDetail';

// Layouts
import AppLayout from './pages/layout/AppLayout';
import AdvertsLayout from './pages/layout/AdvertsLayout';
import ProtectedRoute from './components/protected/ProtectedRoute';
import AdvertDetail from './pages/adverts/AdvertDetail';

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
        element: <ProtectedRoute />,
        loader: currentUserLoader,
        children: [
          {
            path: '/adverts',
            element: <AdvertsLayout />,
            children: [
              {
                index: true,
                element: <AllAdverts />,
                loader: allAdvertsLoader,
              },
              {
                path: 'new',
                element: <CreateAdvert />,
                loader: tagsLoader,
                action: createAdvertAction,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
