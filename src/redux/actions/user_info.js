import {interfaces} from "../../public/interfaces";
import history from '../../public/history';

export const SET_USER_INFO = "user_info/SET_USER_INFO";

function getUserInfoSucc(info) {
    return {
        type: SET_USER_INFO,
        info: info
    }
}

export function getUserInfo() {
    return function (dispatch) {
        return fetch(interfaces.url_userinfo,{
            method: 'get',
            credentials: 'include'
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    if(json.error == 0){
                        dispatch(getUserInfoSucc(json.data))
                    }
                    else{
                        if(error == 2){
                            alert("未登录，请先登录")
                            history.push("/login");
                        }
                    }
                }
            ).catch(
                () => {
                }
            )
    }
}