import {GET_ROUTER_LIST_REQUEST, GET_ROUTER_LIST_SUCCESS, GET_ROUTER_LIST_FAIL} from '../actions/router_list';

const initState = {
    is_loading: false,
    router_list: {},
    error_msg: ''
};

export default function reducer(state=initState,action){
    switch(action.type){
        case GET_ROUTER_LIST_REQUEST:
            console.log("GET_ROUTER_LIST_REQUEST")
            return {
                ...state,
                is_loading: true,
                router_list: {},
                error_msg: ''
            };
        case GET_ROUTER_LIST_SUCCESS:
            console.log("GET_ROUTER_LIST_SUCCESS")
            return {
                ...state,
                is_loading: false,
                router_list: action.result.data,
                error_msg: ''
            };
        case GET_ROUTER_LIST_FAIL:
            console.log("GET_ROUTER_LIST_FAIL")
            return {
                ...state,
                is_loading: false,
                router_list: {},
                error_msg: '请求错误'
            };
        default:
            return state
    }
}