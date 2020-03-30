// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

export function getAllUser(){
    return(myfetch('/user/getAllUser', 'GET'))
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