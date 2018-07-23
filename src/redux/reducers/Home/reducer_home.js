import {
    SET_FIRM_INFO,
    UPDATE_SEARCH_VAL,
    CLEAR_SHEARCH,
    SET_TABLE_LOADING,
    GET_TABLE_DATA,
    GET_TABLE_DATA_ERROR
} from '../../actions/Home/action_home';
const initState = {
    firm_list: [],
    search_items:{},
    slave_data: {
        loading: false,
        data:[]
    }
};

export default function reducer(state=initState,action){
    switch(action.type){
        case SET_FIRM_INFO:
            return {
                ...state,
                firm_list: action.info.detail
            };
        case UPDATE_SEARCH_VAL:
            let key = action.key
            let value = action.value
            let updated_item = {}
            updated_item[action.key] = action.value
            return Object.assign(
                {},
                state,
                {search_items: Object.assign({}, state.search_items, updated_item)}
                )
        case CLEAR_SHEARCH:
            return {
                ...state,
                search_items: {}
            };
        case SET_TABLE_LOADING:
            let data = state.slave_data.data? JSON.parse(JSON.stringify(state.slave_data.data)) : false
            return {
                ...state,
                slave_data:{
                    loading: true,
                    data:data
                }
            };
        case GET_TABLE_DATA:
            return {
                ...state,
                slave_data:{
                    loading: false,
                    data:action.data
                }
            };
        case GET_TABLE_DATA_ERROR:
            return {
                ...state,
                slave_data:{
                    loading: false,
                    data: false
                }
            };
        default:
            return state
    }
}