// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 默认获取所有生成系统信息
 */
export function getAllSysName(){
    return(myfetch('/system/getSysName', 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}