import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { saveTodoStorage } from '../pages/todo/redux/todoMiddleware';
import reducer from './reducer';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const store = createStore(reducer, applyMiddleware(saveTodoStorage));

export default store;