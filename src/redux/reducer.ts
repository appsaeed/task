
import { combineReducers } from "redux";
import todoReducer from '../pages/todo/redux/todoReducer';


export default combineReducers({
    ...todoReducer
});