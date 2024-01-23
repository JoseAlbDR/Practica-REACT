import { createStore, combineReducers, applyMiddleware, Action } from 'redux';

import * as reducers from './reducers';
import * as auth from '../pages/auth/service';
import * as adverts from '../pages/adverts/service';
import * as actionCreators from './actions';

import { withExtraArgument } from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';
import { Auth, ReduxState } from '../interfaces/state.interface';
import type { Router } from '@remix-run/router';

// const composeEnhancers = composeWithDevTools({ actionCreators });

export default function configureStore(
  preloadedState: { auth: Auth },
  { router }: { router: Router }
) {
  const middleware = withExtraArgument<
    ReduxState,
    Action,
    { api: actionCreators.Api; router: Router }
  >({
    api: { auth, adverts },
    router,
  });

  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    // composeEnhancers(applyMiddleware(...middleware))
    applyMiddleware(middleware)
  );

  return store;
}
