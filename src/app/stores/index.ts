import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {environment} from '../../environments/environment';

const isProd = environment.production;

interface ExtendWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
}

const composeEnhancers = isProd ?
  compose :
  (window as ExtendWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
