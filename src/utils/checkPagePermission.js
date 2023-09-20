// pageNavObj是汇总的各页面所有需要权限校验的Nav
import { pageNavObj } from '@/utils/pageNavObj'
/*
*  当前页面权限是在route中取值,同级Tab页是从navList中取值,请保持两个地方的权限一致
*  在当前页面中检查用户是否有权限跳转当前页面
*   检查当前页面是否需要校验权限
*     1. 如果不需要校验,则直接退出
*     2. 需要权限校验,则判断是否有当前页面权限
*       2.1. 如果有权限,则直接退出
*       2.2. 如果没有权限,则检查是否有同级Tab页菜单
*         2.2.1 如果有同级Tab页菜单,则判断是否有其它Tab页权限
*           2.2.1.1 有同级Tab页权限,则返回第一个有权限Tab页面路径
*            2.2.1.2 没有同级Tab页权限,则返回404页面路径
*         2.2.2 没有同级Tab页菜单,则返回404页面路劲
*  */
export function checkPagePermission(to, from, whiteBtnList=[]){
  const permissionKey = to.meta?.permissionKey //获取页面权限key
  if(!permissionKey) return console.log('当前页面不校验权限=>',to.meta?.title) // 1.当前页面没有权限key,退出校验
  // 2.当前页面需要校验权限
  console.log('是否拥有当前页面权限=>',!!whiteBtnList[permissionKey])
  if(whiteBtnList[permissionKey]) return // 2.1有页面权限,校验完成
  // 2.2没有当前页面权限,则检查是否有同级Tab页菜单
  if(to.meta?.navKey){  // 2.2.1如果有同级Tab页菜单
    let navList = pageNavObj[to.meta?.navKey]
    if(!navList){ console.warn('没有对应Nav,请检查') }
    const menuList = [...navList]//获取同级Tab页菜单
    console.log('menuList=>',menuList)
    let redirectUrl = ''
    // 找到第一个有权限Tab页面
    for (let i = 0; i < menuList.length; i++) {//循环当前菜单
      const menu = menuList[i]
      if (whiteBtnList[menu.permissionKey] || !menu.permissionKey) {//找到当前菜单哪个菜单存在于权限中或不需要权限
        redirectUrl = menu.url//顺位第一个的菜单地址
        break//找到后即关闭方法
      }
    }
    if (redirectUrl) {//2.2.1.1有同级Tab页权限,则跳转第一个有权限Tab页面
      console.log('没有当页权限,跳转同级Tab菜单')
      return { path: redirectUrl }
    }else{ // 2.2.1.2如果一个权限页面都没有则跳转404
      console.log('没有当页权限,没有同级Tab权限,跳转404')
      return { path: '/404' }
    }
  }else{  // 没有同级Tab页,则跳转404页面
    // console.log('没有当页权限,没有同级页面,跳转404')
    return { path: '/404' }
  }
}