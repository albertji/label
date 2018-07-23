import qs from 'qs'
import history from '../../public/history';
import {interfaces} from "../../public/interfaces"

export const GET_LOGIN_ERROR = "login/GET_LOGIN_ERROR";
export const GET_LOGIN_REQUEST = "login/GET_LOGIN_REQUEST";
export const GET_LOGIN_BACK = "login/GET_LOGIN_BACK";
export const GET_LOGIN_SUCCESS = "login/GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAIL = "login/GET_LOGIN_FAIL";
export const SET_LOGIN_USERNAME = "login/SET_LOGIN_USERNAML";
export const SET_LOGIN_PASSWORD = "login/SET_LOGIN_PASSWORD";

function getLoginSucc(error){
    return {
        type: GET_LOGIN_SUCCESS,
        error: error
    }
}
function getLoginFail(error){
    return {
        type: GET_LOGIN_FAIL,
        error: error
    }
}
export function setUserName(username){
    return {
        type: SET_LOGIN_USERNAME,
        val: username
    }
}
export function setPassword(pwd){
    return {
        type: SET_LOGIN_PASSWORD,
        val: pwd
    }
}

export function doLogin(user,pwd) {
    return function (dispatch) {
        let params = {
            name: user,
            password: pwd
        }
        var postParams = new URLSearchParams()
        postParams.set('name',params.name)
        postParams.set('password',params.password)
        return fetch(interfaces.url_login,{
            method: 'post',
            body: postParams,
            credentials: 'include'
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    dispatch(getLoginSucc(json.error))
                    if(json.error == 0){
                        history.push("/");
                    }
                    else{
                        alert("用户名或密码错误")
                    }
                }
            ).catch(
                () => {
                    dispatch(getLoginFail(json.error));
                }
            )
    }
}
/*
export function doLogin(usr,pwd) {
    return {
        types: [GET_LOGIN_REQUEST, GET_LOGIN_BACK, GET_LOGIN_ERROR],
        promise: client => client.post(`/datasys/rbac/home/login/`,qs.stringify({name: usr, password: pwd}),{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}),
        //promise: client => client.get(`http://10.19.19.23:8091/datasys/user/permission/front/`),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.error == 0){
                dispatch(getLoginSucc(response.data.error))
                history.push("/");
                //window.location.href = "/test.html"
            }
            else{
                dispatch(getLoginFail(response.data.error))
            }
        }
    }
}*/
