/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-03-17 20:22:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\utils\axios.js
 */
import {iMessage} from 'rise'
import {getToken, removeToken, setToken, setRefreshToken} from '@/utils'
import store from '@/store'
/* import i18n from 'i18n' */

export default function httpRequest(baseUrl = '', timeOut = 600000) {
    // eslint-disable-next-line no-undef
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: timeOut,
        transformRequest: [(data) => {
            // 对 data 进行任意转换处理
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substr(0, ret.length - 1)
            return ret
        }]

    });
    instance.interceptors.request.use(
        function (config) {
            /* if (Object.prototype.toString.call(config.data) === '[object FormData]') {
              config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            console.log('axios config', config.headers) */
            // 拿到本地token，给到后台。
            if (
                getToken() &&
                getToken() !== 'undefined' &&
                config.url.indexOf('refreshToken') === -1 &&
                config.url.indexOf('loginOut') === -1
            ) {
                config.headers['token'] = getToken() || ''
                // config.headers['token'] = ''
            }

            // 查询参数自动清除null，'' 值
            if (config.clearEmptyParams && config.params) {
                const newParams = {}
                for (const key in config.params) {
                    if (Object.hasOwnProperty.call(config.params, key)) {
                        const element = config.params[key]
                        if (element !== null && element !== '') {
                            newParams[key] = element
                        }
                    }
                }
                if (Object.keys(newParams).length > 0) {
                    config.params = newParams
                }
            }

            // IE上的同一个url请求会走cache
            if (config.method === 'post' || config.method === 'POST') {
                config.url =
                    config.url.indexOf('?') > -1
                        ? config.url + '&t=' + parseInt(Math.random() * 10000000000)
                        : config.url + '?t=' + parseInt(Math.random() * 10000000000)
            } else if (config.method === 'get' || config.method === 'GET') {
                config.params = {
                    t: parseInt(Math.random() * 10000000000),
                    ...config.params
                }
            }

            // 定义请求得数据结构是json
            config.headers['json-wrapper'] = '1'
            config.headers['token'] = getToken() || ''
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        function (response) {
            if (response.data) {
                // 自动提示错误或成功
                /* const { request } = response
                console.log('request', request)
                console.log('i18n', i18n.locale)
                const { data } = response
                const message = i18n.locale === 'zh' ? data.desZh : data.dscEn
                if (!request.hideMessage) {
                  if (data.result) {
                    iMessage.success(message)
                  } else {
                    iMessage.error(message)
                  }
                } */
                return Promise.resolve(response.data)
            } else {
                iMessage.error(response.data.message)
                return Promise.reject(response.data)
            }
        },
        error => {
            switch (error.response.status) {
                //需要定位到登录界面的状态。（401 || 40x || ...）
                case 401:
                    store
                        .dispatch('refreshToken')
                        .then(res => {
                            if (res.code === 200) {
                                setToken(res.data.access_token)
                                setRefreshToken(res.data.refresh_token)
                                return instance(error.config)
                            }
                        })
                        .catch(() => {
                            removeToken()
                            window.location.replace('/login')
                        })
                    break
                default: {
                    //防止多次提示,多个请求同时失败！上一个提示还存在时候，先不做提示。
                    let errorMessage = error.message || ''
                    if (
                        error &&
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        errorMessage = error.response.data.message
                    }
                    if (
                        document.getElementsByClassName('el-message').length === 0 &&
                        errorMessage.length > 0
                    ) {
                        iMessage.error(errorMessage)
                    }
                    break
                }
            }
        }
    )

    return instance
}
