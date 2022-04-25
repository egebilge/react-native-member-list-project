// inside the redux module, we import theree functions {createStore, combinereducers, applyMiddleware}
import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import userReducer from './reducers';

// we create a constat called rootReducer to combine all the created reducers (functions from reducers.js) in one place.
const rootReducer = combineReducers({userReducer});

// we create the Store using rootReducer and thunk as middleware !!
// Actually middleware extends the stores abilities and lets you write async logic that interacts with the store.
export const Store = createStore(rootReducer, applyMiddleware(thunk));
