/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-12-22 20:37:09
 * @LastEditors: Please set LastEditors
 * @Description: 项目中登录时候获取整个项目的权限以及token.
 * @FilePath: \rise\src\permission.js
 */
import router from './router'
import store from '@/store'
import {getToken, removeToken} from '@/utils'
import {MessageBox} from 'element-ui'
// eslint-disable-next-line no-unused-vars
const whiteList = ['/login', '/ui', '/superLogin']

router.beforeEach((to, from, next) => {
    const token = getToken()
    // eslint-disable-next-line no-debugger
    if (token) {
        if (to.path === '/login' || to.path === '/sourceinquirypoint/designate/decisiondata/exportPdf') {
            //有token的时候，如果输入了一个登陆界面。则将其定向到主页
            next('/')
        } else {
            const userRule = store.state.permission.userInfo.id
            if (!userRule) {
                store
                    .dispatch('userInfoByToken')
                    .then(() => {
                        store
                            .dispatch('getPermissinInfo')
                            .then((res) => {
                                if (res.length == 0 && store.state.permission.userInfo.userType == 1) { // 解决onlinebiddig 过渡方案
                                    removeToken()
                                    // next('/login')
                                    // 打个提示框，不然无权限用户会重复跳转
                                    const appLoading = document.getElementById('app-loading')
                                    if (appLoading) {
                                        appLoading.style.display = 'none'
                                    }
                                    MessageBox.alert(
                                        '该账号无任何权限，请授予权限或切换账号再登录!',
                                        '无权限',
                                        {
                                            confirmButtonText: '确定',
                                            type: 'warning ',
                                            callback: (action) => {
                                                store
                                                    .dispatch('loginOut')
                                                    .then(() => {
                                                        next('/login')
                                                    })
                                                    .catch(() => {
                                                        next('/login')
                                                    })
                                            },
                                        }
                                    )
                                } else {
                                    //router.addRoutes(res);
                                    router.replace({path: to.path, query: to.query})
                                }
                            })
                            .catch(() => {
                                console.warn(
                                    '警告：获取菜单或解析菜单错误！已为您重定向到登录界面.'
                                )
                                /*************************************
                                 * 测试逻辑，先将本地的token清除掉之后重定向
                                 *************************************/
                                removeToken()
                                // next('/login')
                                /*************************************
                                 * 正确逻辑，先退出登录一次，再重定向到登录
                                 *************************************/
                                store
                                    .dispatch('loginOut')
                                    .then(() => {
                                        next('/login')
                                    })
                                    .catch(() => {
                                        next('/login')
                                    })
                            })
                    })
                    .catch(() => {
                        removeToken()
                        next('/login')
                        // store.dispatch('loginOut').then(()=>{
                        //   next("/login");
                        // }).catch(()=>{
                        //   next("/login");
                        // })
                    })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            //当前没token，并且路由满足白名单，则按照当前路由来控制。
            next()
        } else {
            next('/login')
        }
    }
})
