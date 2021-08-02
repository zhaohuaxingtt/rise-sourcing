<!--
 * @Author: Luoshuang
 * @Date: 2021-07-29 20:59:42
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-30 14:54:18
 * @Description: 
 * @FilePath: \front-web\src\views\project\overview\components\overviewTable.vue
-->

<template>
  <div class="overviewTable" v-loading="tableLoading">
    <div v-for="(item, index) in tableTitle" :key="index" class="overviewTable-column">
      <div class="overviewTable-cell title">
        {{item.key ? language(item.key, item.name) : item.name}}
      </div>
      <div v-for="(dataItem, index) in tableData" :key="index" class="overviewTable-cell">
        <div class="baiscInfo" v-if="item.props === 'basic'">
          <div class="baiscInfo-top">
            <img src="../../../../assets/images/car.png" />
            <span>{{dataItem.cartypeProjectZh}}</span>
          </div>
          <div class="baiscInfo-bottom">
            <ol class="baiscInfo-bottom-column">
              <li>{{dataItem.carPlatformCode}}</li>
              <li>{{dataItem.brandName}}</li>
              <li>{{dataItem.carTypeLevel}} class</li>
            </ol>
            <ol class="baiscInfo-bottom-column">
              <li>{{dataItem.werk}}</li>
              <li>SOP:{{`${moment(dataItem.sop).year()}-KW${moment(dataItem.sop).week()}`}}</li>
              <li>KPE:{{dataItem.kpe}}<icon symbol name="iconbianji"  class="margin-left10 cursor"></icon></li>
            </ol>
          </div>
        </div>
        <div v-else-if="item.props === 'caozuo'" class="caozuo">
          <div class="cursor">
            <icon symbol name="icontiaozhuanpaicheng"  class="margin-right10"></icon>
            <span class="openLinkText">{{language('TIAOZHUANPAICHENG','跳转排程')}}</span>
          </div>
          <div class="cursor margin-top30">
            <icon symbol name="icontiaozhuanjiankong"  class="margin-right10"></icon>
            <span class="openLinkText">{{language('TIAOZHUANJIANKONG','跳转监控')}}</span>
          </div>
        </div>
        <div v-else-if="item.type === 'year'" class="yearCell">
          <div v-for="indexItem in [1,2,3,4]" :key="indexItem" class="yearCell-item">
            <div v-for="(nodeItem, index) in getNodeList(item.props, indexItem, dataItem.nodeList)" :key="index" class="node">
              <!-- 已完成 -->
              <icon v-if="nodeItem.status == 1" symbol name="icondingdianguanli-yiwancheng"  class="step-icon"></icon> 
              <!-- 正在进行中 -->
              <icon v-else-if="nodeItem.status == 2" symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
              <!-- 未完成 -->
              <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
              <span class="node-title">{{nodeItem.label}}</span>
              <span class="node-week">KW{{nodeItem.week}}</span>
            </div>
            <div v-if="getLineNode(item.props, indexItem, dataItem.nodeList)" class="node nodeLine">
              <icon v-if="getLineNode(item.props, indexItem, dataItem.nodeList) && getLineNode(item.props, indexItem, dataItem.nodeList).lineStatus == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="step-between-icon"></icon>
              <!-- 已完成 -->
              <icon v-else-if="getLineNode(item.props, indexItem, dataItem.nodeList) && getLineNode(item.props, indexItem, dataItem.nodeList).lineStatus == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="step-between-icon"></icon>
              <!-- 未完成 -->
              <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="step-between-icon"></icon>
              <span class="node-title"></span>
              <span class="node-week"></span>
            </div>
          </div>
        </div>
        <div v-else class="nomal-cell">{{dataItem[item.props]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { icon } from 'rise'
import moment from 'moment'
export default {
  components: { icon },
  props: {
    tableTitle: {type:Array},
    tableData: {type:Array},
    tableLoading: {type:Boolean, default: false}
  },
  data() {
    return {
      moment,
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
    }
  },
  methods: {
    getLastStatus(year, season, nodeList) {
      const sameYearLastNode = nodeList.filter(item => item.year == year && item.season < season)
      if (sameYearLastNode.length > 0) {
        return sameYearLastNode[sameYearLastNode.length - 1].status
      }
      if (year == moment().year()) {
        return -1
      }
      const nodeListBeforeYear = nodeList.filter(item => item.year < year)
      if (nodeListBeforeYear.length > 0) {
        return nodeListBeforeYear[nodeListBeforeYear.length - 1].status
      }
      return -1
    },
    getNextStatus(year, season, nodeList) {
      const sameYearNextNode = nodeList.filter(item => item.year == year && item.season > season)
      if (sameYearNextNode.length > 0) {
        return sameYearNextNode[0].status
      }
      if (year == moment().year() + 3) {
        return -1
      }
      const nodeListNextYear = nodeList.filter(item => item.year > year)
      if (nodeListNextYear.length > 0) {
        return nodeListNextYear[0].status
      }
      return -1
    },
    getLineNode(year, season, nodeList) {
      if (!nodeList) {
        return null
      }
      if (this.getNodeList(year, season, nodeList).length > 0) {
        return null
      } else {
        const lastStatus = this.getLastStatus(year, season, nodeList)
        const nextStatus = this.getNextStatus(year, season, nodeList)
        if (lastStatus === 2 || lastStatus === 3){
          return {
            lineStatus: 3
          }
        }
        if (lastStatus === 1) {
          if (nextStatus === 1) {
            return {
              lineStatus: 1
            }
          }
          if (nextStatus === 2) {
            return {
              lineStatus: 2
            }
          }
        }
        return null
      }
    },
    getNodeList(year, season, nodeList) {
      if (!nodeList) {
        return []
      }
      return nodeList.filter(item => {
        if (item.year == year) {
          if (season < 4) {
            return item.week > (season - 1) * 13 && item.week < (season * 13 + 1)
          } else {
            return item.week > (season - 1) * 13
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overviewTable {
  display: flex;
  overflow: auto;
  &-column {
    flex-shrink: 0;
    min-width: 130px;
    .overviewTable-cell {
      height: 200px;
      background-color: rgba(236, 239, 245, 0.2);
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &.title {
        height: 40px;
        background-color: rgba(231, 234, 240, 1);
        font-size: 16px;
        font-weight: bold;
        padding: 9px 20px;
      }
      .nomal-cell {
        padding: 0 30px;
        font-size: 14px;
      }
      .caozuo {
        padding: 0 30px;
      }
      .baiscInfo {
        width: 264px;
        &-top {
          display: flex;
          flex-direction: column;
          align-items: center;display: flex;
          img {
            width: 110px;
          }
          span {
            font-size: 16px;
            margin-top: 13px;
            font-weight: bold;
          }
        }
        &-bottom {
          display: flex;
          justify-content: space-around;
          font-size: 14px;
          color: rgba(92, 99, 113, 1);
          padding: 20px 0 0 20px;
          &-column {
            display: flex;
            flex-direction: column;
            li {
              margin-bottom: 5px;
              list-style-type: disc;
            }
          }
        }
      }
      .yearCell {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        &-item {
          height: 100%;
          flex-shrink: 0;
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .node {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .step-icon {
              width: 36px;
              height: 36px;
            }
            &-title {
              font-size: 16px;
              font-weight: bold;
              margin-top: 25px;
            }
            &-week {
              font-size: 14px;
              color: rgba(95, 104, 121, 1);
              margin-top: 8px;
            }
          }
          .nodeLine {
            width: 100%;
            margin-bottom: 36px;
            .step-between-icon {
              width: 100%;
            }
          }
        }
        .yearCell-item + .yearCell-item {
          border-left: 4px solid #fff;
        }
      }
    }
  }
  .openLinkText {
    color:$color-blue;
    text-decoration: underline;
  }
}
</style>