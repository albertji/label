import {interfaces} from "../../../public/interfaces";
import history from "../../../public/history";
import { message } from 'antd';

export const SET_FIRM_INFO = "home/SET_FIRM_INFO";
export const UPDATE_SEARCH_VAL = "home/UPDATE_SEARCH_VAL";
export const CLEAR_SHEARCH = "home/CLEAR_SHEARCH";
export const SET_TABLE_LOADING = "home/SET_TABLE_LOADING";
export const GET_TABLE_DATA = "home/GET_TABLE_DATA";
export const GET_TABLE_DATA_ERROR = "home/GET_TABLE_DATA_ERROR";

message.config({
    top: 200,
    duration: 1,
    maxCount: 1,
});


function getFirmInfoSucc(info) {
    return {
        type: SET_FIRM_INFO,
        info: info
    }
}

function getTableDataSucc(data){
    return {
        type: GET_TABLE_DATA,
        data: data
    }
}

function getTableDataError(result){
    return {
        type: GET_TABLE_DATA_ERROR,
        result: result
    }
}

export function updateSearchVal(key,value) {
    return {
        type: UPDATE_SEARCH_VAL,
        key: key,
        value: value
    }
}
export function clearSearch() {
    return {
        type: CLEAR_SHEARCH
    }
}
export function getFirmInfo() {
    return function (dispatch) {
        return fetch(interfaces.url_firminfo,{
            method: 'get',
            credentials: 'include'
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    if(json.error == 0){
                        dispatch(getFirmInfoSucc(json.data))
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

export function setTableLoading(){
    return {
        type: SET_TABLE_LOADING
    }
}

export function getTableData(data) {
    var postParams = new URLSearchParams()
    for(var key in data){
        if(data[key] !== ""){
            postParams.set(key,data[key])
        }
    }
    return function (dispatch) {
        return fetch(interfaces.url_slaveview,{
            method: 'post',
            credentials: 'include',
            body: postParams
        })
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                    if(json.error == 0){
                        dispatch(getTableDataSucc(json.data))
                    }
                    else{
                        if(json.error == 2){
                            alert("未登录，请先登录")
                            history.push("/login");
                        }
                        else{

                            message.error(json.msg);
                            dispatch(getTableDataError(json))
                        }
                    }
                }
            ).catch(
                () => {
                }
            )
    }
}
