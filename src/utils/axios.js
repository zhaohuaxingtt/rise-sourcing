/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-02-24 18:07:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\axios.js
 */
import { iMessage } from '@/components';
import {getToken,removeToken,setToken,setRefreshToken} from '@/utils'
import store from '@/store'
 export default function httpRequest(baseUrl='',timeOut=15000) {
    // eslint-disable-next-line no-undef
    const instance = axios.create({
      baseURL:baseUrl,
      timeout:timeOut
    })
    instance.interceptors.request.use(function (config) {
      // 拿到本地token，给到后台。
      if(getToken() && getToken()!=='undefined' && (config.url.indexOf('refreshToken') === -1) && (config.url.indexOf('loginOut') === -1)){
        config.headers['token'] = getToken() || ''
      }
      // IE上的同一个url请求会走cache
      if (config.method === 'post' || config.method === 'POST') {
        config.url = config.url.indexOf('?') > -1 ? config.url + '&t=' + parseInt(Math.random() * 10000000000) : config.url + '?t=' + parseInt(Math.random() * 10000000000)
      } else if (config.method === 'get' || config.method === 'GET') {
        config.params = {
          t: parseInt(Math.random() * 10000000000),
          ...config.params
        }
      }
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    instance.interceptors.response.use(function (response) {
      if(response.data && response.data.code == 200){
        return Promise.resolve(response.data);
      }else{
        iMessage.error(response.data.message)
      }
    },(error)=> {
      switch (error.response.status) {
        //需要定位到登录界面的状态。（401 || 40x || ...）
        case 401:
          store.dispatch('refreshToken').then(res=>{
            if(res.code === 200){
              setToken(res.data.access_token)
              setRefreshToken(res.data.refresh_token)
              return instance(error.config)
            }
          }).catch(()=>{
            removeToken()
            window.location.replace('/login')
          })
          break;
        default:
           //防止多次提示,多个请求同时失败！上一个提示还存在时候，先不做提示。
          if(document.getElementsByClassName('el-message').length == 0){
            iMessage.error(error.message)
          }
          break;
      }
    });

    return instance
 }