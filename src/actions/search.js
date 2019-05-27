
import * as actionTypes from "../constants/index"
import api from "../util/api"
import request from "../util/request"
const saveSearchHot = (data) => {
    return {
        type:actionTypes.SAVE_SEARCH_HOT,
        data
    }
}

const saveSearchResult = (data)=>{
    return{
        type:actionTypes.SAVE_SEARCH_RESULT,
        data
    }
};

const clearSearchResult = ()=>{
    return{
        type:actionTypes.CLEAR_SEARCH_RESULT
    }
};


const fetchSearchHot = ()=>{
    return async dispatch =>{
        try{
            let result = await request.get(`/mobilecdn/${api.searchHot}?format=json`);
            let resultData = await result.json();
            console.log(resultData)
            let info = resultData.data.info;//sort有误,纠正一下
            for(let i = 0; i < info.length; i++){
                info[i].sort = i;
            }
            dispatch(saveSearchHot(info))
        }catch(err){
            console.log("Error:",err)
        }
    }
}

const fetchSearchResult = (keyword,page=1,pagesize=20) => {
    return async dispatch =>{
        try{
            //不要手动打空格换行,会影响地址
            let result = await request.get(`/mobilecdn/${api.searchResult}?format=json&keyword=${keyword}&page=${page}&pagesize=${pagesize}`);
            let resultData = await result.json();
            console.log(resultData)
            dispatch(saveSearchResult(resultData.data.info))
        }catch(err){
            console.log("Error:"+err)
        }
    }
}
export {fetchSearchHot, fetchSearchResult, clearSearchResult}