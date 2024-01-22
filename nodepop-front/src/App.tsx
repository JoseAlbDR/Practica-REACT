import type { Router } from '@remix-run/router';
import { RouterProvider } from 'react-router-dom';

function App({ router }: { router: Router }) {
  return <RouterProvider router={router} />;
}

export default App;
