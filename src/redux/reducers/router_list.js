import { GET_ROUTER_LIST_SUCCESS} from '../actions/router_list';

const initState = {
    list: false
};

export default function reducer(state=initState,action){
    switch(action.type){
        case GET_ROUTER_LIST_SUCCESS:
            return {
                ...state,
                list: action.list
            };
        default:
            return state
    }
}