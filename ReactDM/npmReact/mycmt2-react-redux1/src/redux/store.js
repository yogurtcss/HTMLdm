import {createStore,applyMiddleware} from 'redux';
import {cmts} from './reducers';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(
    cmts,
    composeWithDevTools( applyMiddleware(thunk) )
);