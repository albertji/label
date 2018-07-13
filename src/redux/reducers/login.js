import {GET_LOGIN_FAIL, GET_LOGIN_SUCCESS, SET_LOGIN_PASSWORD, SET_LOGIN_USERNAME} from "../actions/login";

const initState = {
    login_status: false,
    error_msg: '',
    input_info: {
        user: "",
        pwd: ""
    }
};
export default function reducer(state=initState,action){
    switch(action.type){
        case GET_LOGIN_SUCCESS:
            return {
                ...state,
                login_status: true,
                error_msg:  action.error
            };
        case GET_LOGIN_FAIL:
            return {
                ...state,
                login_status: true,
                error_msg: action.error
            };
        case SET_LOGIN_USERNAME:
            return {
                ...state,
                input_info: {
                    user: action.val,
                    pwd: state.input_info.pwd
                }
            };
        case SET_LOGIN_PASSWORD:
            return {
                ...state,
                input_info: {
                    user:  state.input_info.user,
                    pwd: action.val
                }
            };
        default:
            return state
    }
}