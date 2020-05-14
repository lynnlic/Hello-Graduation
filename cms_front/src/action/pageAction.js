// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 根据条件获得页面信息
 * @param {*} name  页面名称
 * @param {*} sysId 系统id
 * @param {*} currentPage 当前页码 
 * @param {*} number 每页条数
 */
export function getPagesByCondition(name, sysId, currentPage=1, number=5){
    const obj={
        name:name===""?undefined:name,
        sysId:sysId,
        currentPage:currentPage,
        number:number
    }
    return(myfetch('/page/getPagesByCondition', 'POST', JSON.stringify(obj)))
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
 * 删除文件
 * @param {*} pagePath 
 */
export function deletePage(pageId,pagePath){
    const obj = {
        pageId:pageId,
        pagePath:pagePath
    }
    console.log('id',pageId,'path',pagePath+'')
    return(myfetch('/page/deletePage', 'POST',JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        console.log('user',res);
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}