import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import red from '../reducers/index';
import thunk from 'redux-thunk';

// const rootReducer = combineReducers({
//   form: formReducer
// });

const store = createStore(red, applyMiddleware(thunk));

export default store;
