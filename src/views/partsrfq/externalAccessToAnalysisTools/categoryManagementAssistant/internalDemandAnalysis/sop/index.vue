<!--
 * @Author: 舒杰
 * @Date: 2021-08-16 14:51:40
 * @LastEditTime: 2021-08-16 20:01:58
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\sop\index.vue
-->
<template>
   <iCard class="margin-top20" id="sop">
      <template slot="header">
         <div class="flex-between-center title">
            <div class="flex-align-center">
               <span>{{language("SOPJINDUZHOU","SOP进度轴")}}</span>
            </div>
            <div class="flex">
              <iSelect class="margin-right15" v-model="carTypeId">
                   <el-option :value="item.id" :label="item.cartypeProNameZh" v-for="(item,index) in carTypeCodeArr" :key="index"></el-option>
               </iSelect>
               <iButton @click="getOverviewList">{{ language("QUEREN", "确认") }}</iButton>
               <iButton @click="reset">{{ language("CHONGZHI", "重置") }}</iButton>
               <iButton @click="save">{{ language("BAOCUN", "保存") }}</iButton>
               <iButton @click="back">{{ language("FANHUI", "返回") }}</iButton>
            </div>
         </div>
		</template>
      <!-- powerBi -->
      <div id="powerBi">
       <tableList :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" ></tableList>
      </div>
   </iCard>
</template>
<script>
import {iCard,iButton,iMessage,iSelect} from "rise";
import { cloneDeep } from 'lodash';
import moment from 'moment';
import tableList from './overviewTable'
import {sopList,carTypeProList} from "@/api/categoryManagementAssistant/internalDemandAnalysis/sop";
export default ({
   components:{iCard,iButton,tableList,iSelect},
   data () {
      const currentYear = moment().year()
      return {
         carProjectOptions: [],
         purchaseOptions: [],
         tableTitle: [
         {props: 'basic', name: '基础信息', key: 'JICHUXINXI'},
         {props: currentYear, name: currentYear, type: 'year'},
         {props: currentYear + 1, name: currentYear + 1, type: 'year'},
         {props: currentYear + 2, name: currentYear + 2, type: 'year'},
         {props: currentYear + 3, name: currentYear + 3, type: 'year'},
         {props: 'output', name: '产量', key: 'CHANLIANG'},
         {props: 'projectPurchaserName', name: 'PM', key: 'PROJECTPM'},
         // {props: 'caozuo', name: '操作', key: 'CAOZUO'}
         ],
         tableData: [],
         tableLoading: false,
         progressList: [
         { label: 'PD', date: 'pepPd', value: 'pepPdWk', status: 'pepPdStatus' },
         { label: 'PF', date: 'pepPf', value: 'pepPfWk', status: 'pepPfStatus' },
         { label: 'KF', date: 'pepKf', value: 'pepKfWk', status: 'pepKfStatus' },
         { label: 'PLF', date: 'pepPlf', value: 'pepPlfWk', status: 'pepPlfStatus' },
         { label: 'BF', date: 'pepBf', value: 'pepBfWk', status: 'pepBfStatus' },
         { label: 'LF', date: 'pepLf', value: 'pepLfWk', status: 'pepLfStatus' },
         { label: 'VFF', date: 'pepVff', value: 'pepVffWk', status: 'pepVffStatus' },
         { label: 'PVS', date: 'pepPvs', value: 'pepPvsWk', status: 'pepPvsStatus' },
         { label: '0S', date: 'pepOs', value: 'pepOsWk', status: 'pepOsStatus' },
         { label: 'SOP', date: 'pepSop', value: 'pepSopWk', status: 'pepSopStatus' },
         { label: 'ME', date: 'pepMe', value: 'pepMeWk', status: 'pepMeStatus' }
         ],
         tableDataTemp: [],
         categoryCode:"",//材料组
         carTypeId:"",//车型项目id
         carTypeCodeArr:[]
      }
   },
   created() {
      this.categoryCode=this.$store.state.rfq.categoryCode
      this.getOverviewList()
      this.carTypeProList()
  },
   methods: {
    // 重置
    reset(){
      this.carTypeId=""
      this.getOverviewList()
    },
    //  获取车型项目
    carTypeProList(){
      carTypeProList({categoryCode:this.categoryCode}).then(res=>{
        this.carTypeCodeArr=res.data
      })
    },
      // 获取进度轴
      getOverviewList() {
      this.searchParams = {}
      this.tableLoading = true
      let params={
         categoryCode:this.categoryCode,
         id:this.carTypeId
      }
      sopList(params).then(res => {
        if (res?.result) {
          const list = (res.data || []).map(item => {
            const nodeList = this.getNodeList(item.pepTimeNode)
            return {
              ...item,
              nodeList: nodeList,
            }
          })
          this.tableData = cloneDeep(list)
          this.tableDataTemp = cloneDeep(list)
          this.carProjectOptions = (res.data || []).map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProjectZh
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 整合节点信息
     * @Author: Luoshuang
     * @param {*} node
     * @return {*}
     */    
    getNodeList(node) {
      if(node) {
        const nodeInYearList = this.progressList.reduce((accu, curr, index) => {
          if (curr.label !== 'PD' && node[curr.date] && node[curr.date] !== '') {
            const week = Number(node[curr.value]?.split('KW')[1])
            return [...accu, {
              ...curr,
              year: Number(node[curr.value]?.split('-')[0]),
              week: week,
              season: week < 14 ? 1 : week < 27 ? 2 : week < 39 ? 3 : 4,  
              fullDate: node[curr.date],
              status: this.getStatus(node[curr.date], accu[accu.length - 1] ? accu[accu.length - 1].fullDate : null)
            }]
          } else {
            return accu
          }
        },[])
        return nodeInYearList
      }
      return []
    },
     /**
     * @Description: 获取节点状态
     * @Author: Luoshuang
     * @param {*} currDate
     * @param {*} beforeDate
     * @return {*}
     */    
    getStatus(currDate, beforeDate) {
      if (moment(currDate).isBefore(moment())) {
        return 1
      } else if (beforeDate) {
        if (moment(beforeDate).isBefore(moment())) {
          return 2
        } else {
          return 3
        }
      } else {
        return 2
      }
    },
    // 返回
      back(){
         this.$router.go(-1)
      }
   }
})
</script>
<style lang="scss" scoped>
.title{
   width: 100%;
}
</style>
