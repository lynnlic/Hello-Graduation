// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * 新增生成页面请求
 * @param {*} obj 
 */
export function uploadPageInfo(obj){
    console.log('----***', obj)
    return(myfetch('/page/uploadPageInfo', 'POST', JSON.stringify(obj)))
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
 * 提交页面申请
 * @param {*} unSavedPageId 提交申请但未生成的页面id
 */
export function createNewPage(unSavedPageId){
    var obj={
        'unSavedPageId':unSavedPageId
    }
    return(myfetch('/page/createNewPage', 'POST', JSON.stringify(obj)))
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
 * 查看已生成的页面信息，包括内容部分
 * @param {*} pageId 
 */
export function getSavedPageInfo(pageId){
    var obj={
        'savedPageId':pageId
    }
    return(myfetch('/page/getPageByPageId', 'POST', JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

export function uploadEditPageInfo(pageId,selectedTags=[]){
    var obj={
        pageId:pageId,
        content:selectedTags
    }
    return(myfetch('/page/uploadEditPageInfo', 'POST', JSON.stringify(obj)))
    .then((res) => {return res.json(); })
    .then((res) => {
        const data = {
            isFetching: false,
            result:res
        }
        return data;
    })
}

export function downloadFile(sysName){
    var obj={
        sysName:sysName
    }
    return(myfetch('/page/downloadFile', 'POST',JSON.stringify(obj)))
    .then((response) => {//包含请求头等信息
        //blob（）：读取 Response 对象并且将它设置为已读，返回Promise对象
        response.blob().then(blob => {
            const aLink = document.createElement('a');
            document.body.appendChild(aLink);
            aLink.style.display='none';
            const objectUrl = window.URL.createObjectURL(blob);
            aLink.href = objectUrl;
            aLink.download = sysName;//触发a标签的下载属性
            aLink.click();
            document.body.removeChild(aLink);
            sessionStorage.setItem('downloadResult',JSON.stringify(response.status))
        });
    }).catch((error) => {
      console.log('文件下载失败', error);
      sessionStorage.setItem('downloadResult',JSON.stringify(206))
    })
    
}