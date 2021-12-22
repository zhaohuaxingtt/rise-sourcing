/*
 * @Author: haojiang
 * @Date: 2021-02-24 14:28:34
 * @LastEditTime: 2021-07-14 21:15:30
 * @LastEditors: Please set LastEditors
 * @Description: 获取审批记录列表，因为审批附件需要判断审批记录是否支持提交，所以将列表方法独立出来
 */
import Vuex from 'vuex'
import {
  findHistoryByAeko,
  getHistoricByParams,
} from '@/api/aeko/detail/approveRecord'

export const recordmMixins = {
  data() {
    return {
      recordTableListData: []
    }
  },
  computed: {
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    checkFirstRecord() {
      if (this.recordTableListData == null || this.recordTableListData.length <= 0) return false

      let valid = false
      const validItems = this.recordTableListData.filter(o => o.activityName === '【补充材料通知】补充材料')
      validItems.forEach(item => {
        !valid && (valid = !this.itemIsCanReply(item))
      })
      if (valid) return true

      let firstItem = this.recordTableListData[0]
      if (null != firstItem) {
        return firstItem.operation == '补充材料'
      }
      return false
    },
  },
  methods: {
    itemIsCanReply(row, index=null) {
      // 第一行如果是补充材料就允许编辑
      if (row.activityName == "【补充材料通知】补充材料") return index !== 0
      //不用回复
      return row.disabled
    },
    /**
     * @description: 获取解释记录
     * @param {*}
     * @return {*}
     */
     getexplainList() {
      const parmas = Object.assign({
        applyUserId: String(this.userInfo.id) || '',
        currentUserId: String(this.userInfo.id) || '',
        aekoNo: this.aekoInfo.aekoCode || '',
        hasParentTaskId: true,
        pageNo: 1,
        pageSize: 10
      })
      const {query} = this.$route;
      const {from=''} = query;
      if(from == 'check'){
        const data = {
          aekoNo: this.aekoInfo.aekoCode || '',
          hasParentTaskId: true,
          pageNo: 1,
          pageSize: 10
        };
        getHistoricByParams(data).then(res => {
          let resDatas = res.data.records
          // resDatas= resDatas.filter(item=>item.comment!='AutoCompleted')
          this.recordTableListData = resDatas.map(item => {
            item.disabled = item.activityName != '【补充材料通知】补充材料'
            return item
          })
        })
      }else{
        findHistoryByAeko(parmas).then(res => {
          let resDatas = res.data.records
          resDatas= resDatas.filter(item=>item.comment!='AutoCompleted')
          this.recordTableListData = resDatas.map(item => {
            item.disabled = item.activityName != '【补充材料通知】补充材料'
            return item
          })
        })
      }
    },
  }
}