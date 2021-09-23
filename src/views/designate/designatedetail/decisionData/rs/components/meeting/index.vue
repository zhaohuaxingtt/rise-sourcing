<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-22 17:27:52
 * @Description: 上会/备案RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <iCard :title="'CSC定点推荐 - ' + cardTitle">
      <div slot="header-control" class="singleSourcing" v-if="isSingle">Single Sourcing</div>
      <div class="rsTop">
        <div class="rsTop-left">
          <div class="rsTop-left-item" v-for="(item, index) in leftTitle" :key="index">
            <div class="rsTop-left-item-title">{{ item.name }}{{ item.enName  }}</div>
            <div class="rsTop-left-item-value">{{basicData[item.props]}}</div>
          </div>
        </div>
        <div class="rsTop-right">
          <div v-for="(item, index) in rightTitle" :key="index"  class="rsTop-right-item">
            <template v-if="Array.isArray(item)">
              <div class="rsTop-right-item-title">
                 <div v-for="(subItem, subIndex) in item" :key="subIndex"> {{subItem.name}}{{subItem.enName}} <br v-if="subIndex < item.length - 1" /></div>
              </div>
              <div class="rsTop-right-item-value">
                <div v-for="(subItem, subIndex) in item" :key="subIndex">
                  {{subItem.props === 'currency' ? basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].code : '' : basicData[subItem.props]}}<br v-if="subIndex < item.length - 1" /></div>
              </div>
            </template>
            <template v-else>
              <div  class="rsTop-right-item-title">{{item.name}} {{item.enName}}</div>
                <div class="rsTop-right-item-value" v-if="item.props == 'suppliersNow'" >
                  <div v-for="(item,index) in basicData[item.props]" :key="index">
                      <el-tooltip :content="`${item.shortNameZh}/${item.shortNameEn}`" placement="top" effect="light">
                        <div  style="overflow: hidden;text-overflow: ellipsis;width:100%"><span style="white-space: nowrap">{{item.shortNameZh}}/</span>
                        <span style="white-space: nowrap">{{item.shortNameEn}}</span><br/></div>
                      </el-tooltip>
                  </div>
                </div>       
                <div class="rsTop-right-item-value" v-else >
                  <span v-html="basicData[item.props]">
                  </span>
                </div>
            </template>
          </div>
        </div>
      </div>
      <tableList v-update :selection="false" :tableTitle="tableTitle" :tableData="tableData" class="rsTable" >
        <!-- 年降 -->
        <template #ltc="scope">
          <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
        </template>

        <!-- 年降开始时间 -->
        <template #beginYearReduce="scope">
          <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
        </template>

        <template #supplierSapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>

      </tableList>
      <div class="beizhu">
        备注 Remarks:
        <div class="beizhu-value" v-if="isPreview">
          <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
        </div>
      </div>
      <div v-if="projectType === partProjTypes.DBLINGJIAN || projectType === partProjTypes.DBYICHIXINGCAIGOU" style="text-align:right;">
        汇率：Exchange rate: 
        <span class="exchangeRageCurrency" v-for="item in exchangeRageCurrency" :key="item">
          1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].code : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.code : 'RMB'}}
        </span>
      </div>
    </iCard>
    <iCard v-if="!isPreview && !showSignatureForm" :title="language('SHANGHUIBEIZHU','上会备注')" class="margin-top20">
      <iButton slot="header-control" @click="handleSaveRemarks" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
      <div class="meetingRemark">
        <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
          <span class="meetingRemark-item-title">{{language(item.key,item.label)}}</span>
          <iInput class="margin-top10" type="textarea" :rows="10" resize="none" v-model="remarks[item.type]" @input="val => handleInput(val, item.type)"></iInput>
        </div>
      </div>
    </iCard>
    <iCard v-if="!showSignatureForm" class="checkDate" :class="!isPreview && 'margin-top20'" :title="'Application Date：'+processApplyDate">
      <div class="checkList">
        <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
          <icon v-if="item.approveStatus == '1'" symbol name="iconrs-wancheng"></icon>
          <icon v-else-if="item.approveStatus == '2'" symbol name="iconrs-quxiao"></icon>
          <div v-else class="" >-</div>
          <div class="checkList-item-info">
            <span>Dept.:</span>
            <span class="checkList-item-info-depart">{{item.approveDeptNumName}}</span>
          </div>
          <div class="checkList-item-info">
            <span>Date:</span>
            <span>{{item.approveDate}}</span>
          </div>
        </div>
      </div>
    </iCard>
    <iCard title="Prototype Cost List" class="margin-top20" v-if='!showSignatureForm && PrototypeList.length > 5'>
      <el-table :data='PrototypeList'>
        <template v-for="(items,index) in prototypeTitleList">
          <el-table-column :key="index" :prop="items.props" align="center" :label="language(items.i18nKey,items.i18nName)"></el-table-column>
        </template>
      </el-table>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon, iMessage } from 'rise'
import { nomalDetailTitle,nomalDetailTitleGS,nomalDetailTitlePF, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList, gsDetailTitleBlue, gsTableTitle,sparePartTableTitle,accessoryTableTitle,prototypeTitleList,dbTableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { getList, getRemark, updateRemark,getPrototypeList, getDepartApproval } from '@/api/designate/decisiondata/rs'
import {partProjTypes} from '@/config'
import { findFrontPageSeat } from '@/api/designate'
import { zipWith } from "lodash"
export default {
  props: {
    isPreview: {type:Boolean, default:false},
    nominateId: {type:String},
    // projectType: {type:String},
    showSignatureForm: {type:Boolean, default:false}
  },
  components: { iCard, tableList, iButton, iInput, icon },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      remarks: {},
      // leftTitle: nomalDetailTitle,
      // rightTitle: nomalDetailTitleBlue,
      // tableTitle: nomalTableTitle,
      tableData: [],
      basicData: {},
      remarkItem: [],
      checkList: checkList,
      resetRemarkType: '',
      saveLoading: false,
      PrototypeList:[],
      prototypeTitleList:prototypeTitleList,
      processApplyDate: '',
      projectType: '',
      isSingle: false,
      suppliers: ''
    }
  },
  computed: {
    exchangeRageCurrency() {
      if (this.basicData.currencyRateMap) {
        const exchangeRageCurrency = []
        for (var key in this.basicData.currencyRateMap) {
          if (key) {
            exchangeRageCurrency.push(key)
          }
        }
        return exchangeRageCurrency
      }
      return []
    },
    leftTitle() {
      // GS
      if ([partProjTypes.GSLINGJIAN,partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
        return nomalDetailTitleGS
      }
      // 配附件
      if ([partProjTypes.PEIJIAN,partProjTypes.FUJIAN].includes(this.projectType)) {
        return nomalDetailTitlePF
      }
      // 其他
      return nomalDetailTitle
    },
    rightTitle() {
      // GS
      if ([partProjTypes.GSLINGJIAN,partProjTypes.GSCOMMONSOURCING].includes(this.projectType)) {
        return nomalDetailTitleBlue
      }
      // 其他
      return gsDetailTitleBlue

    },
    tableTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      } else if (this.projectType === partProjTypes.GSLINGJIAN || this.projectType === partProjTypes.GSCOMMONSOURCING) { //GS零件
        return gsTableTitle
      } else if (this.projectType === partProjTypes.DBLINGJIAN || this.projectType === partProjTypes.DBYICHIXINGCAIGOU) { //DB零件,DB一次性采购
        return dbTableTitle
      }
      return nomalTableTitle
    },
    cardTitle() {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return '配件采购 CSC Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return '附件采购 CSC Nomination Recommendation – Accessory Purchasing'
      }
      return '生产采购 CSC Nomination Recommendation - Production Purchasing'
    },
    getRemarkAll() {
      return this.remarkItem.map(item => item.value).join('\n')
    }
  },
  // created(){this.getPrototypeList()},
  methods: {
    getIsSingle() {
      findFrontPageSeat({nominateId:this.nominateId}).then(res => {
        if (res.result) {
          this.isSingle = res.data.isSingle
        } else {
          this.isSingle = false
        }
      })
    },
    /**
     * @Description: 获取部门审批记录
     * @Author: Luoshuang
     * @param n*o
     * @return n*o
     */    
    getDepartApproval() {
      getDepartApproval(this.nominateId).then(res => {
        if (res?.result) {
          this.checkList = res.data.nomiApprovalProcessNodeVOList
          this.processApplyDate = res.data.processApplyDate || ''
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @description: US 描述当大于5条的时候则需要显示这个card 不管任何零件采购项目。任何linie
     * @param {*}
     * @return {*}
     */
    getPrototypeList(){
      getPrototypeList(this.nominateId).then(res=>{
          this.PrototypeList = res.data.list || res.data.getQuotationSampleVOList || []
          // 获取上会备注
          if(res.data && res.code==200){
            this.remarkItem = meetingRemark.map(item => {
                this.remarks[item.type] = res.data[item.remarkType] || ''
                return {...item, value: res.data[item.remarkType] || ''}
            })
          }
      }).catch(err=>{
        console.warn(err)
      })
    },
    /**
     * @Description: 保存备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSaveRemarks() {
      this.saveLoading = true
      const params = {
        meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        remarkType: this.resetRemarkType
      }
      updateRemark(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getRemark()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    /**
     * @Description: 备注变化时保存当前修改的备注类型
     * @Author: Luoshuang
     * @param {*} val
     * @param {*} type
     * @return {*}
     */    
    handleInput(val, type) {
      this.remarkItem = this.remarkItem.map(item => {
        return {
          ...item,
          value: item.type === type ? val : item.value
        }
      })
      this.remarks[type] = val
      this.resetRemarkType = type
    },
    /**
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      this.getTopList()
      // this.getRemark()
      this.getDepartApproval()
      this.getPrototypeList()
      this.getIsSingle()
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTopList() {
      getList(this.nominateId).then(res => {
        if (res?.result) {
          let temdata = res.data || {}
          temdata.suppliersNow =temdata.supplierVoList
          if(temdata.partNameDe){
            temdata.partName = `${temdata.partName}/${temdata.partNameDe}`
          }
          this.basicData = temdata
          let data = res.data?.lines
          data.forEach((val,index) => {
            let suppliersNowCn =[]
            let suppliersNowEn =[]
            val.supplierVoList.forEach(val =>{
              suppliersNowCn.push(val.shortNameZh)
              suppliersNowEn.push(val.shortNameEn)
            })
            let supplierData=[]
            for(let i = 0 ;i <suppliersNowCn.length;i++) {
              let dataSuper = `${suppliersNowCn[i]}/${suppliersNowEn[i]}`
              supplierData.push(dataSuper)
            }
            supplierData = supplierData.length ? supplierData.join('\n') : '-'
            val.suppliersNow = supplierData.replace(/\n/g,"<br/>");
            if(val.supplierNameEn)
            val.supplierName = `${val.supplierName}/${val.supplierNameEn}`
              if(val.partNameDe)
            val.partName = `${val.partName}/${val.partNameDe}`
          })
          this.tableData = data
          this.projectType = res.data.partProjectType || ''
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 获取备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRemark() {
      getRemark(this.nominateId).then(res => {
        if (res?.result) {
          res.data.forEach(element => {
            this.remarks[element.remarkType] = element.remark || ''
            this.remarkItem = meetingRemark.map(item => {
              return {...item, value: this.remarks[item.type]}
            })
          })
        } else {
          this.remarks = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },

    // 单独处理下年降或年降计划
    resetLtcData(row=[],type){
      // 年降开始时间
      if(type == 'beginYearReduce'){
        // 取第一个非0的年份
        const list = row.filter((item)=> item.ltcRateStr !='0');
        return list.length ? list[0].ltcDate : '-'
      }else{ // 年降
       // 从非0开始至非0截至的数据 不包含0
       let strList = [];
       let strFlag = false;

       for(let i =0;i<row.length;i++){
         
         if(row[i].ltcRateStr  !='0' && row[i].ltcRateStr ){
            strFlag = true;
           strList.push(row[i].ltcRateStr -0);
         }else if(strFlag && row[i].ltcRateStr  == '0'){
           break
         }
       }
       return strList.length ? strList.join('/') : '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exchangeRageCurrency + .exchangeRageCurrency {
  margin-left: 20px;
}
.singleSourcing {
  padding: 8px 12px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(22, 96, 241, 1);
  border: 1px dashed #1660F1;
}
.rsTable {
  font-size: 12px;
  &::before {
    height: 0;
  }
  ::v-deep thead th {
    padding-top: 8px;
    padding-bottom: 8px;
    & > .cell {
      padding-left: 5px;
      padding-right: 5px;
      line-height: 14px;
      span span {
        font-size: 10px;
      }
    }
  } 
}
.rsTop {
  display: flex;
  &-left {
    width: 65%;
    display: flex;
    flex-wrap: wrap;
    &-item {
      width: 50%;
      font-size: 12px;
      display: flex;
      height: 17px;
      margin-bottom: 24px;
      &:last-of-type {
        margin-bottom: 26px;
      }
      &-title {
        font-weight: bold;
        width: 40%;
      }
      &:nth-of-type(odd) {
        .rsTop-left-item-title {
          width: 33%;
        }
      }
      &-value {
        font-weight: 400;
        width: 60%;
      }
    }
  }
  &-right {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid rgba(197, 204, 214, 0.42);
    border-radius: 5px 5px 0 0;
    &-item {
      width: 45%;
      display: flex;
      border-bottom: 1px solid rgba(197, 204, 214, 0.42);;
      &:nth-of-type(odd) {
        width: 55%;
        border-right: 1px solid rgba(197, 204, 214, 0.42);
      }
      &-title {
        background-color: rgba(22, 96, 241, 0.06);
        border-right: 1px solid rgba(197, 204, 214, 0.42);
        padding: 10px 24px;
        width: 60%;
        font-weight: bold;
        line-height: 29px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &-value {
        width: 40%;
        padding: 10px 24px;
        line-height: 29px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &:nth-of-type(even) {
        .rsTop-right-item-title {
          width: 65%;
        }
        .rsTop-right-item-value {
          width: 35%;
        }
      }
    }
  }
}
.beizhu {
  background-color: rgba(22, 96, 241, 0.03);
  // height: 40px;
  padding: 12px 14px;
  font-weight: bold;
  display: flex;
  &-value {
    font-weight: 400;
    margin-left: 20px;
  }
}
.meetingRemark {
  display: flex;
  &-item {
    flex: 1;
    & + & {
      margin-left: 24px;
    }
    &-title {
      font-size: 16px;
      color: rgba(44, 46, 51, 1);
      font-weight: 400;
    }
  }
}
.checkList {
  display: flex;
  overflow: auto;
  &-item {
    flex-shrink: 0;
    width: 224px;
    height: 178px;
    border-radius: 15px;
    background-color: rgba(205, 212, 226, 0.12);
    margin-right: 19px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30px 22px;
    font-size: 16px;
    color: rgba(65, 67, 74, 1);
    &-info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      &-depart {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
.checkDate {
  ::v-deep .cardHeader .title {
    // font-size: 16px;
    font-weight: 400;
    color: rgba(75, 75, 76, 1);
  }
} 
.isPreview {
  .card {
    box-shadow: none;
  }
}
</style>
