import { createStore, combineReducers, applyMiddleware } from 'redux';
import { auth } from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const reducers = combineReducers({
    auth
});

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));

export default store;
