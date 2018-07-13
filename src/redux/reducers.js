import {combineReducers} from "redux";
import login_info from './reducers/login';
import router_list from './reducers/router_list';
//import userInfo from './reducers/userInfo';

export default combineReducers({
    login_info,
    router_list
})