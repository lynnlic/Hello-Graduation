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
        console.log('content',res);
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

export function getTemplateByCondition(sysId,templateName,state,currentPage=1, number=5){
    const obj={
        sysId:sysId,
        templateName:templateName==""?undefined:templateName,
        state:state==""?undefined:state,
        currentPage:currentPage,
        number:number
    }
    console.log('obj',obj);
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