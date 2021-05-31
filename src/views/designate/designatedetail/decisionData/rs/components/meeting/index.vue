<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:17:25
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-31 11:29:01
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
      <tableList :selection="false" :tableTitle="tableTitle" :tabelData="tableData" class="rsTable" />
      <div class="beizhu">备注 Remarks:<span class="beizhu-value"></span></div>
    </iCard>
    <iCard v-if="!isPreview" title="上会备注" class="margin-top20">
      <iButton slot="header-control">保存</iButton>
      <div class="meetingRemark">
        <div class="meetingRemark-item" v-for="(item, index) in remarkItem" :key="index">
          <span class="meetingRemark-item-title">{{item.label}}</span>
          <iInput class="margin-top10" type="textarea" :rows="10" resize="none"></iInput>
        </div>
      </div>
    </iCard>
    <iCard class="checkDate" :class="!isPreview && 'margin-top20'" :title="'申请日期：2020-01-01'">
      <div class="checkList">
        <div class="checkList-item" v-for="(item, index) in checkList" :key="index">
          <icon v-if="item.status === '1'" symle name="iconrs-wancheng"></icon>
          <icon v-else-if="item.status === '2'" symle name="iconrs-quxiao"></icon>
          <div v-else class="" >-</div>
          <div class="checkList-item-info">
            <span>部门:</span>
            <span class="checkList-item-info-depart">{{item.department}}</span>
          </div>
          <div class="checkList-item-info">
            <span>日期:</span>
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iButton, iInput, icon } from 'rise'
import { nomalDetailTitle, nomalDetailTitleBlue, nomalTableTitle, meetingRemark, checkList } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
export default {
  props: {
    isPreview: {type:Boolean, default:false}
  },
  components: { iCard, tableList, iButton, iInput, icon },
  data() {
    return {
      leftTitle: nomalDetailTitle,
      rightTitle: nomalDetailTitleBlue,
      tableTitle: nomalTableTitle,
      tableData: [],
      basicData: {
        partName: '发动机控制器 STEUERGERAET, MOTOR',
        partNum: 'See below'
      },
      remarkItem: meetingRemark,
      checkList: checkList
    }
  },
  computed: {
    cardTitle() {
      // '附件采购 CSC Nomination Recommendation – Accessory Purchasing'
      // '配件采购 CSC Nomination Recommendation - Spare Part Purchasing'
      return '生产采购 CSC Nomination Recommendation - Production Purchasing'
    }
  },
  methods: {}
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
        background-color: #fff;
      }
    }
  }
}
.beizhu {
  background-color: rgba(22, 96, 241, 0.03);
  height: 40px;
  padding: 12px 14px;
  font-weight: bold;
  &-value {
    font-weight: 400;
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
