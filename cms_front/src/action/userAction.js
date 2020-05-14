// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 增加站点
 * @param {*} value 
 */
export function addUser(value={}){
    return (myfetch('/user/addUser','POST',JSON.stringify(value)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

/**
 * 根据条件获取user
 * @param {*} account 账号
 * @param {*} name 用户姓名
 * @param {*} parentId 权限用
 * @param {*} currentPage 当前页
 * @param {*} number 每页条数
 */
export function getUserByCondition(account,name,parentId,currentPage=1, number=10){
    const obj={
        account:account==""?undefined:account,
        name:name==""?undefined:name,
        parentId:parentId,
        currentPage:currentPage,
        number:number
    }
    return(myfetch('/user/getUserByCondition', 'POST',JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}