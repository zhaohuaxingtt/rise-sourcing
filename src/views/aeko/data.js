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
        url: "/aeko/checklist",
        activePath: "/checklist",
        key: "LK_AEKOCHAKAN",
        permissionKey:'AEKO_CHECK',
        role:['isAekoManager','isCommodityCoordinator','isLinie'],
    },
]

export const describeTab = [
    {
        value: 1,
        name: "AEKO描述",
        url: "/aeko/describe",
        activePath: "/describe",
        message: 0,
        key: "LK_AEKOFUJIANMIAOSHU",
        permissionKey:'AEKO_DESCRIBE',
    },
    {
        value: 2,
        name: "零件清单",
        url: "/aeko/partslist",
        activePath: "/partslist",
        message: 0,
        key: "LK_AEKO_PARTSLIST",
        permissionKey:'AEKO_DESCRIBE_PARTLIST',
    },
]

export const filterRole = function(role = {}){
    TAB.map((item)=>{
        for(let key  in role){
            if(role[key] && item.role.includes(key)) {
                item.show = true;
            } 
        }
    })
    const filterTab = TAB.filter((item)=>item.show);
    filterTab.map((item,index)=>{
        item.value = index+1;
    })
    return filterTab
}


export const getLeftTab = function(index=0){
    let leftTab = [
        {
            value: 1,
            name: 'AEKO操作',
            message: 0,
            key: 'LK_AEKOCAOZUO'
        },
        {
          value: 2,
          name: 'AEKO报表',
          message: 0,
          url: '/aeko/report',
          activePath: '/report',
          key: 'LK_AEKOBAOBIAO'
        },
    ];
    const item = TAB[index];
    leftTab[0].url = item.url;
    leftTab[0].activePath = item.activePath;
    leftTab[0].permissionKey = item.permissionKey;

    return leftTab;
}

