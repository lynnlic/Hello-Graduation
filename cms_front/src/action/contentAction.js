// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 根据站点id获取内容
 */
export function getDataBySiteId(siteId){
    return(myfetch('/content/getDataBySiteId?siteId='+siteId, 'GET'))
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
 * 根据条件得到内容
 * @param {*} contentTitle 内容标题
 * @param {*} siteName 站点名
 * @param {*} sysId 系统id
 * @param {*} currentPage 当前页
 * @param {*} number 每页条数
 */
export function getDataByCondition(contentTitle,siteName,sysId,parentId,currentPage=1, number=8){
    const obj={
        contentTitle:contentTitle===''?undefined:contentTitle,
        siteName:siteName===''?undefined:siteName,
        sysId:sysId,
        parentId:parentId,
        currentPage:currentPage,
        number:number
    }
    return(myfetch('/content/getDataByCondition', 'POST', JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

export function loadLocalContent(path,type){
    const obj = {
        path:path,
        type:type
    }
    return(myfetch('/content/loadLocalContent', 'POST', JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        console.log(res);
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

/**
 * 增加内容
 * @param {*} value 
 * @param {*} path
 * @param {*} creatorId  
 */
export function addContent(value,path,creatorId){
    const obj={
        title:value.contentName,
        siteId:value.siteId,
        path:path,
        describe:value.contentDescribe,
        creatorId:creatorId
    }
    return(myfetch('/content/addContent', 'POST', JSON.stringify(obj)))
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
 * 内容修改
 * @param {*} textValue 
 * @param {*} contentId 
 */
export function updateContent(textValue='', contentId=0, path){
    var obj={
        textValue:textValue,
        contentId:contentId,
        path:path
    }
    console.log('obj',obj)
    return(myfetch('/content/updateContent', 'POST', JSON.stringify(obj)))
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