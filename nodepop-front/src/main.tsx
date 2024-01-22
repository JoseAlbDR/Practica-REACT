import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { storage } from './utils/storage.ts';
import { setAuthorizationHeader } from './api/customFetch.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import configureStore from './store/index.ts';
import { router } from './App.tsx';
import { Provider } from 'react-redux';

const accessToken = storage.get('accessToken');
const remember = storage.get('rememberUser');

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const store = configureStore({ auth: !!accessToken }, { router });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider initialLogged={!!accessToken} remember={!!remember}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </>
);
