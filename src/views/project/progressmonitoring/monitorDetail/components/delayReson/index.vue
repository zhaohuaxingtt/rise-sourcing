<!--
 * @Author: Luoshuang
 * @Date: 2021-09-24 13:44:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-25 15:34:35
 * @Description: 延误原因确认弹窗
 * @FilePath: \front-sourcing\src\views\project\progressmonitoring\monitorDetail\components\delayReson\index.vue
-->

<template> 
  <iDialog  
    :visible.sync="dialogVisible" 
    @close="clearDialog" 
    width="90%" 
    class="fsDialog"
  > 
    <template slot="title"> 
      <div class="chosseProGroup"> 
        <span class="chosseProGroup-title">{{language('FASONGYANWUYUANYINQUEREN','发送延误原因确认')}}</span>
        <span>
          <iButton @click="handleConfirm" :loading="saveLoading">{{language('FASONG','发送')}}</iButton>
          <button-table-setting @click="edittableHeader"/>
        </span>
      </div> 
    </template> 
    <div class="tableWrapper" > 
      <tableList 
                  permissionKey="PROJECT_PROGRESSMONITORING_MONITORDETAIL_COMPONENTS_DELAYRESON"
                  indexKey
                 index
                 ref="tableList"
                 :lang="true"
                 :height="600"
                 :tableTitle="tableTitle"
                 :tableData="tableList"
                 :tableLoading="tableLoading"
                 @handleSelectionChange="handleSelectionChange"
                 @handleSelectChange="handleSelectChange"
      >
      <template #fsId="scope">
          <iSelect v-model="scope.row['fsId']" @change="val => handleSelectChange(val, scope.row)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in scope.row.selectOption"
              :key="index"
            ></el-option>
          </iSelect>
      </template>
      <template #confirmDateDeadline="scope">
          <iDatePicker value-format="yyyy-MM-dd" v-model="scope.row['confirmDateDeadline']" />
      </template>
      </tableList> 
    </div> 
  </iDialog> 
</template> 

<script> 
import { iDialog, iButton, iMessage,iSelect,iDatePicker } from 'rise' 
import { tableTitle } from './data'
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { getDelayReasonConfirmList, sendDelayReason } from '@/api/project/process'
import { getFsUserListPart, getAllFS } from '@/api/project'
import moment from 'moment'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [tableSortMixins],
  components: { iDialog, iButton, buttonTableSetting, tableList,iSelect,iDatePicker }, 
  props: { 
    dialogVisible: { type: Boolean, default: false }, 
    cartypeProId: {type:String}, 
    type: {type:String, default: '1'},
    partStatus: {type:String},
    partNums: {type:Array, default:() => []},
    carProjectName: {type:String},
    delayList: {type:Array, default:() => []},
    delayReasonConfirmList: {type:Array, default:() => []},
  }, 
  data() { 
    return { 
      saveLoading: false, 
      tableTitle: tableTitle, 
      tableLoading: false, 
      tableList: [],
      buyer: '', 
      fsOptions: {}, 
      selectData: [], 
      tableData: tableList,
      selectOptions: {}
    } 
  }, 
  watch: {
    dialogVisible(val) {
      if(val) {
        if (this.type === '1') {
          this.getDelayReasonConfirmList()
        } else {
          this.getTableList()
        }
      }
    }
  },
  created() {
    this.getFSOPtions()
  },
  methods: { 
    /** 
     * @Description: 根据选中的行获取每一行的fs下拉列表 
     * @Author: Luoshuang 
     * @param {*} tableList 
     * @return {*} 
     */    
    async getFsUserList(tableList) {  
      const res = await getFsUserListPart(tableList.map(item => item.partNum)) 
        if (res?.result) { 
          return res.data   
        } else { 
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
          return null  
        } 
    }, 
    /**
     * @Description: 判断time1是否大于time2,time1和time2格式为'2021-KW21' 
     * @Author: Luoshuang 
     * @param {*} time1 
     * @param {*} time2 
     * @return {*}
     */    
    isLarger(time1, time2) { 
      if (!time1) { 
        return false 
      } 
      if (!time2) { 
        return true 
      } 
      const year1 = time1.split('-')[0] 
      const week1 = time1.split('KW')[1] 
      const year2 = time2.split('-')[0] 
      const week2 = time2.split('KW')[1] 
      if (year1 > year2) {  
        return true 
      } 
      if (year1 == year2 && week1 >= week2) { 
        return true 
      } 
      return false 
    },  
    /**
     * @Description: 获取fs下拉选项 
     * @Author: Luoshuang 
     * @param {*} 
     * @return {*} 
     */     
    getFSOPtions() { 
      getAllFS().then(res => { 
        if (res?.result) { 
          this.selectOptions = {  
            ...this.selectOptions, 
            fsOptions: res.data.map(item => { 
              return {  
                ...item,  
                value: item.id, 
                label: item.nameZh  
              }  
            }) 
          } 
        } else {  
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        } 
      }) 
    }, 
    async getTableList() {
      this.tableLoading = true
      const fsOptions = await this.getFsUserList(this.delayList || [])
      const { userInfoVOList=[] } = fsOptions;
      this.tableList = this.delayList.map(item => {
        const fs = item.fs
        const fsId = item.fsId + ''
        // const options = fsOptions ? fsOptions[item.partNum]?.reduce((accu, item) => { 
        //   if (item.userId) { 
        //     return [...accu, { 
        //       ...item, 
        //       value: item.userId, 
        //       label: item.userName 
        //     }] 
        //   } else { 
        //     return accu 
        //   } 
        // },[]) : []  
        userInfoVOList.map((userItem)=>{
          userItem.value = userItem.userId;
          userItem.label = userItem.userName;
        })
        return {  
          ...item, 
          // cartypeProId: this.cartypeProId, 
          // cartypeProject: this.carProjectName, 
          // projectPurchaser: this.$store.state.permission.userInfo.nameZh, 
          // projectPurchaserId: this.$store.state.permission.userInfo.id, 
          // selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions, 
          selectOption:userInfoVOList || [],
          fs, 
          fsId
        } 
      });
      this.tableLoading = false
    },
    async getDelayReasonConfirmList() {
      if(this.delayReasonConfirmList.length){
        this.tableList = this.delayReasonConfirmList;
        this.getConfirmListOptions(this.delayReasonConfirmList)
        return;
      }
      try {
        const params = {
          partStatus: this.partStatus,
          projectId: this.cartypeProId,
          selectList: this.partNums.map(item => {return {partNum: item.partNum, tempCode: item.tempCode}})
        }
        this.tableLoading = true
        const res = await getDelayReasonConfirmList(params)
        if (res?.result) {
          const tableList = res.data || []
          if (tableList.length < 1) {
            iMessage.warn(this.language('MEIYOUFUHETIAOJIANDELINGJIAN','没有符合发送条件的零件')) 
            this.tableList = []
            throw(false)
          }
          this.getConfirmListOptions(tableList)
        } else {
          this.tableList = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        }
        this.tableLoading = false
      } catch (e) {
        console.log(e)
        this.tableList = []
        this.tableLoading = false
      }
      
    },
    async getConfirmListOptions(tableList){
      try{
        const fsOptions = await this.getFsUserList(tableList) 
        const {buyerUserMap={},userInfoVOList=[]} = fsOptions;
        this.tableList = tableList.map(item => {
          // const fs = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userName || '' 
          // const fsId = fsOptions && fsOptions[item.partNum] && fsOptions[item.partNum][0].userId || '' 
          // const options = fsOptions ? fsOptions[item.partNum]?.reduce((accu, item) => { 
          //     if (item.userId) { 
          //       return [...accu, { 
          //         ...item, 
          //         value: item.userId, 
          //         label: item.userName 
          //       }] 
          //     } else { 
          //       return accu 
          //     } 
          //   },[]) : []  
          
            let fs = '';
            const fsId = buyerUserMap[item.partNum] ? buyerUserMap[item.partNum]+'' : '';
            userInfoVOList.map((userItem)=>{
              userItem.value = userItem.userId;
              userItem.label = userItem.userName;
              if(fsId && userItem.userId == fsId){
                fs = userItem.userName
              }
            })
            return {  
            ...item, 
            cartypeProId: this.cartypeProId, 
            cartypeProject: this.carProjectName, 
            projectPurchaser: this.$store.state.permission.userInfo.nameZh, 
            projectPurchaserId: this.$store.state.permission.userInfo.id, 
            // selectOption: options && options.length > 0 ? options : this.selectOptions.fsOptions, 
            selectOption:userInfoVOList || [],
            fs, 
            fsId,
            planDate: this.partStatus == '3' ? item.kickoffTimeKw : this.partStatus == '2' ? item.nomiTimeKw : this.partStatus == '5' ? item.firstTryoutTimeKw : this.partStatus == '6' ? this.isLarger(item.emTimeKw, item.otsTimeKw) ? item.otsTimeKw : item.emTimeKw : this.partStatus == '7' ? item.emTimeKw : this.partStatus == '8' ? item.otsTimeKw :'',
            partPeriod: item.partStatus,
            partPeriodDesc: item.partStatusDesc,
            delayWeek: item.delayWeeks,
            confirmDateDeadline: moment(item.replyEndDate).format('YYYY-MM-DD'),
            partName: item.partNameZh,
            isBmg: item.bmgFlag,
            linie: item.linieName
          } 
        });
      }catch (e) {
        console.log(e)
        this.tableList = []
        this.tableLoading = false
      }
    },
    handleSelectChange(val, row) { 
      this.$set(row, 'fs', row.selectOption.find(item => item.value === val).label) 
    }, 
    handleSelectionChange(val) { 
      this.selectData = val 
    }, 
    clearDialog() { 
      this.$emit('changeVisible', false) 
    }, 
    handleConfirm() { 
      if (this.selectData.length < 1) { 
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据')) 
        return 
      } 
      if (this.selectData.some(item => !item.fsId)) { 
        iMessage.warn(this.selectData.filter(item => !item.fsId).map(item => item.partName).join(',') + this.language('XUNJIACAIGOUYUANBUNENGWEIKONG', '询价采购员不能为空')) 
        return 
      } 
      this.saveLoading = true 
      sendDelayReason(this.selectData).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
          this.$emit('changeVisible', false) 
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn) 
        }
      }).finally(() => {
        this.saveLoading = false
      })
      // this.$emit('handleConfirm', [...this.selectDataNomi, ...this.selectDataKickoff]) 
    }, 
    changeSaveLoading(loading) { 
      this.saveLoading = loading 
    } 
  } 
} 
</script> 

<style lang="scss" scoped> 
.borderTop {
  border-top: 1px dashed rgba(65, 67, 74, .2);
}
.fsDialog {
  ::v-deep .el-dialog {
    min-height: 80%;
    padding-bottom: 30px;
  }
}
.chosseProGroup {
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding-right: 20px; 
  &-title { 
    font-size: 18px; 
    font-weight: 600; 
    color: #000 
  }
} 
.tableWrapper { 
  padding-bottom: 20px; 
  .tableTitle { 
    display: block; 
    font-size: 18px; 
    font-weight: bold; 
    color: #000; 
    padding: 20px 0; 
  } 
  &:first-child {
    .tableTitle {
      padding-top: 0;
    }
  }
} 

</style>