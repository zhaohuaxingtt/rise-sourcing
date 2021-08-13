/*
 * @Author: yuszhou
 * @Date: 2021-02-19 15:21:34
 * @LastEditTime: 2021-06-03 17:03:44
 * @LastEditors: Luoshuang
 * @Description: 基于axios的下载封装下载工具，以IE和其他浏览器作为区分。部分浏览器通过blob a标签模拟click来下载
 *               IE通过msSaveBlob来下载。
 * @FilePath: \front-web\src\utils\axios.download.js
 */
import { iMessage } from 'rise';
import {getToken,removeToken,setToken,setRefreshToken} from '@/utils'
import store from '@/store'
const fileType = {
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls': 'application/x-xls',
  'doc': 'application/msword',
  'xlsx': 'application/vnd.ms-excel'
}
export default function httpRequest(baseUrl='',timeOut=15000) {
  // eslint-disable-next-line no-undef
  const instance = axios.create({
    baseURL:baseUrl,
    timeout:timeOut,
    responseType: 'blob'
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
      if (!response) {
        return
      }
      if (response.data.type === 'application/json') { // 不是返回文件流时处理Json报错
        const reader = new FileReader()
        reader.onload = (event) => {
          const lang = localStorage.getItem("lang")
          const errorMsg = JSON.parse(event.target.result);
          iMessage.error(lang == "zh" ? errorMsg.desZh : errorMsg.desEn)
        }
        reader.readAsText(response.data)
        return
      }
      let type = response.headers['content-disposition'] ? response.headers['content-disposition'].split('.')[1] : 'zip'
      let blob = new Blob([response.data], { type: fileType[type] })

      let fileName = `${new Date().toLocaleDateString()}.zip`
      
      if (response.headers["content-disposition"]) {
        fileName = decodeURIComponent(response.headers["content-disposition"].split("=")[1]);
      }

      if (response.headers["fname"]) {
        fileName = decodeURIComponent(response.headers["fname"])
      }
     // 如果是ie则按照saveBlob的方式来下载数据
      if (navigator.msSaveBlob) {
          return navigator.msSaveBlob(blob, fileName)
      }
      // 如果是谷歌和火狐则用a标签来模拟
      let url = window.URL.createObjectURL(blob)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
  }, (error)=> {
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