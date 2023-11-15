import { Outlet, redirect, useNavigation } from 'react-router-dom';
import { getUser } from './service';
import { toast } from 'react-toastify';
import Wrapper from './AdvertsWrapper';
import { Spinner } from '../../components';

export const loader = async () => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    console.log(error);
    toast.error('Unauthenticated, First Login');
    return redirect('/login');
  }
};

const Adverts = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  console.log(navigation.state);
  console.log(isLoading);

  return (
    <Wrapper>
      <main className="adverts">
        <div>
          <div className="adverts-page">
            {isLoading ? <Spinner /> : <Outlet />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Adverts;
