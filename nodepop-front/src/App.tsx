import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import AdvertsLayout from './pages/layout/AdvertsLayout';
import AllAdverts from './pages/adverts/AllAdverts';
import AdvertDetail from './pages/adverts/AdvertDetail';
import CreateAdvert from './pages/adverts/CreateAdvert';
import RequireAuth from './pages/auth/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <AdvertsLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AllAdverts />} />
        <Route path=":id" element={<AdvertDetail />} />
        <Route path="new" element={<CreateAdvert />} />
      </Route>
      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
