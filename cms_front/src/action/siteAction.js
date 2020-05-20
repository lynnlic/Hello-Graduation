// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 增加站点
 * @param {*} value 站点信息
 */
export function addSite(value={}){
    return (myfetch('/site/addSite','POST',JSON.stringify(value)))
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
 *  根据条件查询站点
 * @param {*} sysId 系统ID
 * @param {*} siteName 站点名
 * @param parentId 权限用
 * @param currentPage 当前页
 * @param number 每页多少条
 */
export function getSiteByCondition(sysId,siteName,parentId,currentPage=1, number=5){
    const obj={
        sysId:sysId,
        siteName:siteName==""?undefined:siteName,
        parentId:parentId,
        currentPage:currentPage,
        number:number
    }
    return (myfetch('/site/getSiteByCondition','POST',JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

export function editSite(values){
    return (myfetch('/site/editSite','POST',JSON.stringify({...values})))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}