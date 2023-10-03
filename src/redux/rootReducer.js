import { combineReducers } from 'redux';
import postReducer from '../redux/postReducer';

const rootReducer = combineReducers({
  postReducer,
});

export default rootReducer;