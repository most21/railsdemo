import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import red from '../reducers/index';

// const rootReducer = combineReducers({
//   form: formReducer
// });

const store = createStore(red);

export default store;
