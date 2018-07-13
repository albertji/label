import history from "../../public/history";

export const GET_ROUTER_LIST_REQUEST = "router_list/GET_ROUTER_LIST_REQUEST";
export const GET_ROUTER_LIST_SUCCESS = "router_list/GET_ROUTER_LIST_SUCCESS";
export const GET_ROUTER_LIST_FAIL = "router_list/GET_ROUTER_LIST_FAIL";

/*function getRouterListRequest() {
    return {
        type: GET_ROUTER_LIST_REQUEST
    }
}

function getRouterListSuccess(router_list) {
    return {
        type: GET_ROUTER_LIST_SUCCESS,
        router_list: router_list
    }
}

function getRouterListFail() {
    return {
        type: GET_ROUTER_LIST_FAIL
    }
}*/

export function getRouterList() {
    return function (dispatch) {
        return fetch('/datasys/user/permission/front/',{
            method: 'get',
            credentials: 'include'
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    //dispatch(getLoginSucc(json.error))
                }
            ).catch(
                () => {
                }
            )
    }
}