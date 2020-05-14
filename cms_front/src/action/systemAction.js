// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 获得系统简介
 * @param {*} sysName 
 * @param {*} url 
 * @param {*} parentId 用于权限
 * @param {*} currentPage 
 * @param {*} number 
 */
export function getSysDescribeByCondition(sysName, url, parentId, currentPage=1, number=6){
    const obj={
        sysName:sysName,
        url: url,
        parentId:parentId,
        currentPage: currentPage,
        number: number
    }
    console.log('ovj',obj)
    return(myfetch('/system/getSysDescribeByCondition', 'POST', JSON.stringify(obj)))
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

export function addSystem(values, path, creatorId){
    const obj={
        copyRight:values.copyRight,
        email:values.email,
        phone:values.phone,
        saveName:values.saveName,
        sysName:values.sysName,
        url:values.url,
        path:path,
        creatorId:creatorId
    }
    return(myfetch('/system/addSystem', 'POST', JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        console.log('res',res);
        const data = { 
            isFetching: false,
            result:res
        }
        return data;
    })
}