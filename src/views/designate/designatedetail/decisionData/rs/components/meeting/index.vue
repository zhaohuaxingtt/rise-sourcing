<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-29 16:04:35
 * @Description: 上会/备案RS单
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\components\meeting\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <iCard :title="'CSC定点推荐 - ' + cardTitle">
      <div slot="header-control" class="singleSourcing">Single Sourcing</div>
      <div class="rsTop">
        <div class="rsTop-left">
          <div class="rsTop-left-item" v-for="(item, index) in leftTitle" :key="index">
            <div class="rsTop-left-item-title">{{item.name}} {{item.enName}}:</div>
            <div class="rsTop-left-item-value">{{basicData[item.props]}}</div>
          </div>
        </div>
        <div class="rsTop-right">
          <div v-for="(item, index) in rightTitle" :key="index"  class="rsTop-right-item">
            <template v-if="Array.isArray(item)">
              <div class="rsTop-right-item-title">
                <div v-for="(subItem, subIndex) in item" :key="subIndex">{{subItem.name}} {{subItem.enName}}<br v-if="subIndex < item.length - 1" /></div>
              </div>
              <div class="rsTop-right-item-value">
                <div v-for="(subItem, subIndex) in item" :key="subIndex">{{basicData[subItem.props]}}<br v-if="subIndex < item.length - 1" /></div>
              </div>
            </template>
            <template v-else>
              <div  class="rsTop-right-item-title">{{item.name}} {{item.enName}}</div>
              <div class="rsTop-right-item-value">{{basicData[item.props]}}</div>
            </template>
          </div>
        </div>
      </div>
      <tableList v-update :selection="false" :tableTitle="tableTitle" :tableData="tableData" class="rsTable" />
      <div class="beizhu">
        备注 Remarks:
        <div class="beizhu-value" v-if="isPreview">
          <p v-for="(item,index) in remarkItem" :key="index">{{item.value}}</p>
        </div>
      </div>
      <div v-if="projectType === 'PT04' || projectType === 'PT19'" style="text-align:right;">汇率：Exchange rate: 1USD=7.8RMB</div>
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
    <iCard v-if="!showSignatureForm" class="checkDate" :class="!isPreview && 'margin-top20'" :title="language('SHENQINGRIQI','申请日期')+'：2020-01-01'">
      <div class="checkList">
        <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
          <icon v-if="item.status === '1'" symle name="iconrs-wancheng"></icon>
          <icon v-else-if="item.status === '2'" symle name="iconrs-quxiao"></icon>
          <div v-else class="" >-</div>
          <div class="checkList-item-info">
            <span>{{language('BUMEN','部门')}}:</span>
            <span class="checkList-item-info-depart">{{item.department}}</span>
          </div>
          <div class="checkList-item-info">
            <span>{{language('RIQI','日期')}}:</span>
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon, iMessage } from 'rise'
import { nomalDetailTitle, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList, gsDetailTitleBlue, gsTableTitle, dbTableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { getList, getRemark, updateRemark } from '@/api/designate/decisiondata/rs'
export default {
  props: {
    isPreview: {type:Boolean, default:false},
    nominateId: {type:String},
    projectType: {type:String},
    showSignatureForm: {type:Boolean, default:false}
  },
  components: { iCard, tableList, iButton, iInput, icon },
  data() {
    return {
      remarks: {},
      leftTitle: nomalDetailTitle,
      // rightTitle: nomalDetailTitleBlue,
      // tableTitle: nomalTableTitle,
      tableData: [],
      basicData: {},
      remarkItem: [],
      checkList: checkList,
      resetRemarkType: '',
      saveLoading: false
    }
  },
  computed: {
    rightTitle() {
      if (this.projectType === 'PT11' || this.projectType === 'PT04' || this.projectType === 'PT19') {
        return gsDetailTitleBlue
      }
      return nomalDetailTitleBlue
    },
    tableTitle() {
      if (this.projectType === 'PT17') {
        return sparePartTableTitle
      } else if (this.projectType === 'PT18') {
        return accessoryTableTitle
      } else if (this.projectType === 'PT11') { //GS零件
        return gsTableTitle
      } else if (this.projectType === 'PT04' || this.projectType === 'PT19') { //DB零件,DB一次性采购
        return dbTableTitle
      }
      return nomalTableTitle
    },
    cardTitle() {
      if (this.projectType === 'PT17') {
        return '配件采购 CSC Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === 'PT18') {
        return '附件采购 CSC Nomination Recommendation – Accessory Purchasing'
      }
      return '生产采购 CSC Nomination Recommendation - Production Purchasing'
    },
    getRemarkAll() {
      return this.remarkItem.map(item => item.value).join('\n')
    }
  },
  methods: {
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
      this.getRemark()
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
          this.basicData = res.data || {}
          this.tableData = res.data?.lines
        } else {
          this.basicData = {}
          this.tableData = []
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
      &:nth-of-type(even) {
        .rsTop-right-item-title {
          width: 65%;
        }
      }
      &-value {
        padding: 10px 24px;
        line-height: 29px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
