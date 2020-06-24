import {combineReducers} from 'redux';
import postList from './PostList';

const allReducer = combineReducers({
    postList:postList
});

export default allReducer;