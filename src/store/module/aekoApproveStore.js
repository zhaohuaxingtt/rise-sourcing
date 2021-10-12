const state = {
    itemAekoApproveDetails:null,
    optionAEKOApprove:1,

}
const getters = {
    getItemAekoApproveDetails(state){
        return state.itemAekoApproveDetails;
    },
    getOptionAEKOApprove(state){
        return state.optionAEKOApprove;
    }
};

const mutations = {
    // state指的是state的数据
    // name传递过来的数据
    setItemAekoApproveDetails(state, itemAekoApproveDetails){
        state.itemAekoApproveDetails = itemAekoApproveDetails;//将传参设置给state的itemAekoApproveDetails
    },
    setOptionAEKOApprove(state,optionAEKOApprove){
        state.optionAEKOApprove=optionAEKOApprove
        console.log('setOptionAEKOApprove',state.optionAEKOApprove)
    }
}

const actions ={
// 设置城市信息
    // 参数列表：{commit, state}
    // state指的是state数据
    // commit调用mutations的方法
    // name就是调用此方法时要传的参数
    setItemAEKOApproveDetailsVal({commit,state}, itemAekoApproveDetails){
        // 跟后台打交道
        // 调用mutaions里面的方法
        commit("setItemAekoApproveDetails", itemAekoApproveDetails);
    },
    setOptionAEKOApproveVal({commit,state}, optionAEKOApprove) {
         console.log('setOptionAEKOApproveVal',optionAEKOApprove)
        commit("setOptionAEKOApprove", optionAEKOApprove);

    }
}

export default {
    state,
    mutations,
    actions,
    getters
}