// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

export function login(params){
    console.log(params);
    return(myfetch('/login', 'POST',JSON.stringify(params)))
    .then((res) => {return res.json(); })
    .then((res) => {
        console.log(res);
        const user = {
            isFetching: false,
            result:res
        }
        return user;
    })
}