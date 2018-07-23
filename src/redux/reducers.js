import {combineReducers} from "redux";
import login_info from './reducers/login';
import router_list from './reducers/router_list';
import user_info from './reducers/user_info';
import reducer_home from './reducers/Home/reducer_home';

export default combineReducers({
    login_info,
    router_list,
    user_info,
    reducer_home
})