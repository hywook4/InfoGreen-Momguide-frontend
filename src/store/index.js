import { createStore, combineReducers, applyMiddleware } from 'redux';
import { auth, ask } from '../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const reducers = combineReducers({
    auth,
    ask
});

const store = createStore(reducers, {}, applyMiddleware(thunk, logger));

export default store;
