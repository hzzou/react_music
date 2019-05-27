import qs from 'qs'

const header = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
//传入的只是一个Http响应,而不是真的JSON,
//为了获取JSON内容,需要使用json()方法转义
const parseJSONFilter = (res) => res;

//使用fetch封装,fetch是es7的新特性
let getUrl = "";
const get = (url) => {
    getUrl = url;
    return fetch(url);
};

//body是post方式传递的内容
let postUrl = "";
const post = (url,body) => {
    postUrl = url;
    return fetch(url,{
        body:qs.stringify(body),
        headers:header,
        method:"POST"
    }).then(parseJSONFilter).catch(error=>{console.log(error)});
}

const request = { get, post,getUrl, postUrl};
export default request;