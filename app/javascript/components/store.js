import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer } from '../reducers/index';

// const rootReducer = combineReducers({
//   form: formReducer
// });

const store = createStore(reducer);

export default store;
