// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * currentPage:当前页,
 * number:每页多少条
 */
export function getSysDescribe(currentPage=1, number=6){
    return(myfetch('/system/getSysDescribe?currentPage='+currentPage+'&number='+number, 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

/**得到当前查看详细信息的系统信息
 * sysId:当前系统id
 */
export function getSysDetail(sysId){
    return(myfetch('/system/getSysDetail?sysId='+sysId, 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

/**获得当前系统的页面、站点信息 */
export function getPagesBySysid(sysId){
    return(myfetch('/page/getPagesBySysid?sysId='+sysId, 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}