/*
 * @Author: wentliao
 * @Date: 2021-07-26 16:55:33
 * @Description: aeko相关data
 */

export const TAB = [
    {
        value: 1,
        name: "AEKO管理",
        message: 0,
        url: "/aeko/managelist",
        activePath: "/managelist",
        key: "LK_AEKOGUANLI",
        permissionKey:'AEKO_MANAGE',
        role:['isAekoManager','isCommodityCoordinator'],
    },
    {
        value: 2,
        name: "AEKO表态",
        message: 0,
        url: "/aeko/stancelist",
        activePath: "/stancelist",
        key: "LK_AEKOBIAOTAI",
        permissionKey:'AEKO_STANCE',
        role:['isLinie'],
    },
    {
        value: 3,
        name: "AEKO查看",
        message: 0,
        key: "LK_AEKOCHAKAN",
        permissionKey:'AEKO_CHECK',
        role:['isAekoManager','isCommodityCoordinator','isLinie'],
    },
]

export const filterRole = function(role = {}){
    console.log(role);
    TAB.map((item)=>{
        for(let key  in role){
            if(role[key]) item.show = item.role.includes(key);
            
        }
    })
    const filterTab = TAB.filter((item)=>item.show);
    return filterTab
}


