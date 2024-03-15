
import { combineReducers } from "redux";
import todoReducer from '../pages/todo/redux/todoReducer';
import { notifyReducer } from './notifyStore';


export default combineReducers({
    ...todoReducer,
    notify: notifyReducer
});