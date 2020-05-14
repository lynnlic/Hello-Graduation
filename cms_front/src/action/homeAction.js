// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 加权限的获取系统名
 * @param {*} cid 登陆者id
 */
export function getSysNameByUserState(cid=0){
    return(myfetch('/system/getSysName?cid='+cid, 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}