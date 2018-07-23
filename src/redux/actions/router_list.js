import {interfaces} from "../../public/interfaces"
import history from '../../public/history';

export const GET_ROUTER_LIST_REQUEST = "router_list/GET_ROUTER_LIST_REQUEST";
export const GET_ROUTER_LIST_SUCCESS = "router_list/GET_ROUTER_LIST_SUCCESS";
export const GET_ROUTER_LIST_FAIL = "router_list/GET_ROUTER_LIST_FAIL";

function getRouterListSuccess(list) {
    return {
        type: GET_ROUTER_LIST_SUCCESS,
        list: list
    }
}

export function getRouterList() {
    return function (dispatch) {
        return fetch(interfaces.url_routerlist,{
            method: 'get',
            credentials: 'include'
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    if(json.error == 0){
                        dispatch(getRouterListSuccess(json.data))
                    }
                    else{
                        alert("未登录，请先登录")
                        history.push("/login");
                    }
                }
            ).catch(
                () => {
                }
            )
    }
}