import axios from 'axios';
import { storage,modalInfo,showLoading,hideLoading } from './util.js';
import history from '../components/history/history.js';

axios.defaults.timeout = 30000;


//http request 拦截器
axios.interceptors.request.use(
  config => {
    const user = storage.getStorage('user');
    if(user){
      config.headers = {
        "token":user.token
      }
    }
    // config.headers = {
    //     'Content-Type':'application/x-www-form-urlencoded'
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//统一处理返回结果
export function callbackData(response){
  let code=response.data.code
  switch(code){
    case '20000':
      return '20000';
    case '30000':
      storage.removeStorage('user');
      storage.setStorage('tokenError',response.data.message);
      history.push('/login');
      break;
    default:
      modalInfo('提示',response.data.message)
      break;
  }
}


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Get(url,params={},loading=true){
  return new Promise((resolve,reject) => {
		if(loading){
			showLoading();
		}
    axios.get(window.base+'/'+url,{
      params:params
    })
    .then(response => {
      if(callbackData(response)==='20000'){
				resolve(response.data);
      }
    })
    .catch(err => {
      modalInfo('提示','网络错误请稍候再试！')
    })
    .finally(err=>{
			hideLoading();
   })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function Post(url,params = {},loading=true){
   return new Promise((resolve,reject) => {
		 if(loading){
		   	Loading.show();
		 }
     axios.post(window.base+'/'+url,params)
          .then(response => {
            if(callbackData(response)==='20000'){
							resolve(response.data);
            }
          })
          .catch(err => {
            modalInfo('提示','网络错误请稍候再试！')
          })
          .finally(err=>{
            hideLoading();
         })
   })
 }

