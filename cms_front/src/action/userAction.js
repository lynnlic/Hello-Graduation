// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import 'es6-promise/dist/es6-promise.min.js';
import 'fetch-ie8/fetch.js';
import { myfetch } from '../util/myfetch';

/**
 * currentPage:当前页,
 * number:每页多少条
 */
export function getAllUser(currentPage=1, number=10){
    return(myfetch('/user/getAllUser?currentPage='+currentPage+'&number='+number, 'GET'))
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