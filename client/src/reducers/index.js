import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import profileReducer from './profileReducer';
import countReducer from './countReducer';

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      errors: errorReducer,
      success: successReducer,
      profile: profileReducer,
      count: countReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
