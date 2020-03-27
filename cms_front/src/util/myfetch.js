import { url } from '../constants/config.js';

export const myfetch = (newurl, method, body, contentType) => {
    return fetch(url + newurl, {
    //credentials: 'include',
    method: method,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': !contentType?'application/json':contentType
    },
    mode:'cors',
    body: body
  })
}