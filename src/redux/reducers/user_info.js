import {SET_USER_INFO} from '../actions/user_info';
const initState = {
    name: ""
};

export default function reducer(state=initState,action){
    switch(action.type){
        case SET_USER_INFO:
            return {
                ...state,
                name: action.info.name
            };
        default:
            return state
    }
}