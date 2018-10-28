import { createStore } from 'redux';
import rootReducer from './lib/reducers/index';

const store = createStore(rootReducer);

export default store;
