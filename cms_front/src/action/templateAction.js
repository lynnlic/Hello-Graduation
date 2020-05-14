// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * currentPage:当前页,
 * number:每页多少条
 */
export function getAllTemplate(currentPage=1, number=5){
    return(myfetch('/template/getAllTemplate?currentPage='+currentPage+'&number='+number, 'GET'))
    .then((res) => {return res.json(); })
    .then((res) => {
        console.log('content',res);
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

/**
 * 根据系统id获取其模板
 */
export function getTemplateBySysid(sysId){
    return(myfetch('/template/getTemplateBySysid?sysId='+sysId, 'GET'))
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
 * 获取模板信息
 * @param {*} sysId 
 * @param {*} templateName 
 * @param {*} state 模板状态
 * @param {*} parentId 创建者id
 * @param {*} currentPage 
 * @param {*} number 
 */
export function getTemplateByCondition(sysId,templateName,state,parentId,currentPage=1, number=5){
    const obj={
        sysId:sysId,
        templateName:templateName==""?undefined:templateName,
        state:state==""?undefined:state,
        parentId:parentId,
        currentPage:currentPage,
        number:number
    }
    return(myfetch('/template/getTemplateByCondition', 'POST', JSON.stringify(obj)))
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
 * 上传文件
 * @param {String} fileName 
 */
export function loadLocalTemplate(fileName=''){
    const obj = {
        fileName:fileName
    }
    return(myfetch('/template/loadLocalTemplate', 'POST', JSON.stringify(obj)))
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
 * 
 * @param {*} templateName 
 * @param {*} sysId 
 * @param {*} describe 
 * @param {*} state 
 * @param {*} filePath 
 * @param {*} tagList 
 * @param {*} id 
 */
export function AddTemplate(templateName,sysId,describe,state,filePath,tagList=[],id){
    const obj={
        templateName:templateName,
        sysId:sysId,
        describe:describe,
        state:state,
        filePath:filePath,
        tagList:tagList.join(';'),
        id:id
    }
    return(myfetch('/template/addTemplate', 'POST', JSON.stringify(obj)))
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
 * 根据模板id获得tags
 * @param {*} id 
 */
export function getTagsByTemplateId(id){
    return(myfetch('/template/getTagsByTemplateId?id='+id, 'GET'))
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