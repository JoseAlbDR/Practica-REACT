import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './pages/AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
  },
]);

function App() {
  return <h1>Hello There</h1>;
}

export default App;
