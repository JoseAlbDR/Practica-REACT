import { configureStore as rtkConfigureStore } from '@reduxjs/toolkit';

import * as reducer from './reducers';
import * as auth from '../pages/auth/service';
import * as adverts from '../pages/adverts/service';
import * as actionCreators from './actions';

import { Auth } from '../interfaces/state.interface';
import { Router } from 'react-router-dom';

export default function configureStore(
  preloadedState: { auth: Auth },
  { router }: { router: Router }
) {
  const extraArgument = {
    api: { auth, adverts },
    router,
  };

  const store = rtkConfigureStore({
    reducer,
    preloadedState,
    devTools: { actionCreators },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
        serializableCheck: false,
      }),
  });

  return store;
}
