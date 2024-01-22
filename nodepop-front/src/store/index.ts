import { createStore, combineReducers, applyMiddleware } from 'redux';

import * as reducers from './reducers';
import * as auth from '../pages/auth/service';
import * as adverts from '../pages/adverts/service';
import * as actionCreators from './actions';

import { withExtraArgument } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ReduxState } from '../interfaces/state.interface';

const composeEnhancers = composeWithDevTools({ actionCreators });
import type { Router } from '@remix-run/router';

export default function configureStore(
  initialState: ReduxState,
  { router }: { router: Router }
) {
  const middleware = [withExtraArgument({ api: { auth, adverts }, router })];
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}
