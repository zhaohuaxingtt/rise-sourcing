/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-02-19 15:04:53
 * @LastEditors: Please set LastEditors
 * @Description: 项目中登录时候获取整个项目的权限以及token.
 * @FilePath: \rise\src\permission.js
 */
import router from "./router";
import store from "@/store";
import { getToken } from "@/utils";
// eslint-disable-next-line no-unused-vars
const whiteList = ["/login",'/ui'];
router.beforeEach((to, from, next) => {
  const token = getToken();
  // eslint-disable-next-line no-debugger 
  if (token) {
    if (to.path == "/login") {
      //有token的时候，如果输入了一个登陆界面。则将其定向到主页
      next("/");
    } else {
      const userRule = store.state.permission.menuList.length;
      if (userRule === 0) {
        store
          .dispatch("userInfoByToken")
          .then(() => {
            store
              .dispatch("getPermissinInfo")
              .then((res) => {
                router.addRoutes(res);
                router.replace({path:to.path,query:to.query});
              }).catch(()=>{
                console.warn('警告：获取菜单或解析菜单错误！已为您重定向到登录界面.')
                store.dispatch('loginOut').then(()=>{
                  next("/login");
                }).catch(()=>{
                  next("/login");
                })
              })
          })
          .catch(() => {
            store.dispatch('loginOut').then(()=>{
              next("/login");
            }).catch(()=>{
              next("/login");
            })                                                                    
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //当前没token，并且路由满足白名单，则按照当前路由来控制。
      next();
    } else {
      next("/login");
    }
  }
});
