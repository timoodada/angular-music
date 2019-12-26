import {createStore, compose} from 'redux';
import reducer from './reducers';
import {environment} from '../../environments/environment';
import {Map} from 'immutable';

const isProd = environment.production;

interface ExtendWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}

const composeEnhancers = isProd ?
  compose :
  (window as ExtendWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers());

export default store;

export const getState = (state: string): any => {
  return (store.getState() as Map<string, any>).get(state);
};
