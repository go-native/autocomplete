import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reposReducer } from './repos-reducer';

export const store = createStore(reposReducer, applyMiddleware(thunk));
