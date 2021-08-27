<!--
 * @Author: Luoshuang
 * @Date: 2021-07-29 20:59:42
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-25 10:58:42
 * @Description: 
 * @FilePath: \front-web\src\views\project\overview\components\overviewTable.vue
-->

<template>
  <div class="overviewTable" v-loading="tableLoading">
    <div v-for="(item, index) in tableTitle" :key="index" class="overviewTable-column" >
      <!---------------------------------------------------------------------->
      <!----------                 表头                        ---------------->
      <!---------------------------------------------------------------------->
      <div class="overviewTable-cell title">
        {{item.key ? language(item.key, item.name) : item.name}}
      </div>
      <div v-for="(dataItem, index) in tableData" :key="index" class="overviewTable-cell">
        <!---------------------------------------------------------------------->
        <!----------                  基础信息列                 ---------------->
        <!---------------------------------------------------------------------->
        <div class="baiscInfo" v-if="item.props === 'basic'">
          <div class="baiscInfo-top">
            <img src="../../../../assets/images/car.png" />
            <span>{{dataItem.cartypeProjectZh}}</span>
          </div>
          <div class="baiscInfo-bottom">
            <ol clasdivs="baiscInfo-bottom-column">
              <li>
                <div>
                  <el-tooltip :content='dataItem.carPlatformCode' effect='light'>
                    <span class="overText">{{dataItem.carPlatformCode}}</span>
                  </el-tooltip>
                </div>
              </li>
              <li>
                <div>
                  <el-tooltip :content='dataItem.brandName' effect='light'>
                    <span class="overText">{{dataItem.brandName}}</span>
                  </el-tooltip>
                </div>
              </li>
              <li>
                <div>
                  <el-tooltip :content='dataItem.carTypeLevel + " class"' effect='light'>
                    <span class="overText">{{dataItem.carTypeLevel}} class</span>
                  </el-tooltip>
                </div>
              </li>
            </ol>
            <ol class="baiscInfo-bottom-column">
              <li>
                <div>
                  <el-tooltip :content='dataItem.factoryName' effect='light'>
                    <span class="overText">{{dataItem.factoryName}}</span>
                  </el-tooltip>
                </div>
              </li>
              <li>
                <div>
                  <el-tooltip :content='"SOP:"+dataItem.pepTimeNode && dataItem.pepTimeNode.pepSopWk' effect='light'>
                    <span class="overText">SOP:{{dataItem.pepTimeNode && dataItem.pepTimeNode.pepSopWk}}</span>
                  </el-tooltip>
                </div>
              </li>
              <li>
                <div>
                  <el-tooltip :content='"KPE:"+dataItem.kpe' effect='light'>
                    <span class="overText" style="width:auto;">KPE:{{dataItem.kpe}}</span>
                  </el-tooltip>
                  <icon symbol name="iconbianji"  class="margin-left10 cursor"></icon>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <!---------------------------------------------------------------------->
        <!----------                  操作列                 -------------------->
        <!---------------------------------------------------------------------->
        <div v-else-if="item.props === 'caozuo'" class="caozuo">
          <div class="cursor" @click="openAssistant(dataItem)">
            <icon symbol name="icontiaozhuanpaicheng"  class="margin-right10"></icon>
            <span class="openLinkText">{{language('TIAOZHUANPAICHENG','跳转排程')}}</span>
          </div>
          <div class="cursor margin-top30" @click="openMonitoring(dataItem)">
            <icon symbol name="icontiaozhuanjiankong"  class="margin-right10"></icon>
            <span class="openLinkText">{{language('TIAOZHUANJIANKONG','跳转监控')}}</span>
          </div>
        </div>
        <div v-else-if="item.props === 'output'">{{getTousandNum(dataItem[item.props])}}</div>
        <!---------------------------------------------------------------------->
        <!----------                年份列-节点渲染               ---------------->
        <!---------------------------------------------------------------------->
        <div v-else-if="item.type === 'year'" class="yearCell">
          <div v-for="indexItem in [1,2,3,4]" :key="indexItem" class="yearCell-item" :style="`flex-direction:${getNodeList(item.props, indexItem, dataItem.nodeList).length > 1?'column':'row'};justify-content:${getNodeList(item.props, indexItem, dataItem.nodeList).length > 1?'flex-start':'center'}`">
            <template v-if="getNodeList(item.props, indexItem, dataItem.nodeList).length > 1">
              <div class="iconBox">
                <div v-for="(nodeItem, index) in getNodeList(item.props, indexItem, dataItem.nodeList)" :key="index" class="node small-node1" :style="`left:${nodeItem.left}%;z-index:${nodeItem.left*10}`">
                  <!-- 已完成 -->
                  <icon v-if="nodeItem.status == 1" symbol name="icondingdianguanli-yiwancheng"  class="step-icon"></icon> 
                  <!-- 正在进行中 -->
                  <icon v-else-if="nodeItem.status == 2" symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
                  <!-- 未完成 -->
                  <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
                  <template v-if="nodeItem.withLine">
                    <icon v-if="nodeItem.line.lineStatus == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="short-between-icon"></icon>
                    <!-- 已完成 -->
                    <icon v-else-if="nodeItem.line.lineStatus == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="short-between-icon"></icon>
                    <!-- 未完成 -->
                    <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="short-between-icon"></icon>
                  </template>
                </div>
              </div>
              <div class="textBox">
                <div v-for="(nodeItem, index) in getNodeList(item.props, indexItem, dataItem.nodeList)" :key="index" class="node small-node1">
                  <span class="node-title">{{nodeItem.label}}</span>
                  <span class="node-week">KW{{ nodeItem.week }}</span>
                </div>
              </div>
            </template>
            <div v-else v-for="(nodeItem, index) in getNodeList(item.props, indexItem, dataItem.nodeList)" :key="index" :class="`node ${getNodeList(item.props, indexItem, dataItem.nodeList).length > 1 && 'small-node'+getNodeList(item.props, indexItem, dataItem.nodeList).length}`">
              <!-- 已完成 -->
              <icon v-if="nodeItem.status == 1" symbol name="icondingdianguanli-yiwancheng"  class="step-icon"></icon> 
              <!-- 正在进行中 -->
              <icon v-else-if="nodeItem.status == 2" symbol name="icondingdianguanlijiedian-jinhangzhong" class="step-icon  click-icon"></icon>
              <!-- 未完成 -->
              <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
              <span class="node-title">{{nodeItem.label}}</span>
              <span class="node-week">KW{{ nodeItem.week }}</span>
              <template v-if="nodeItem.withLine">
                <icon v-if="nodeItem.line.lineStatus == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="short-between-icon"></icon>
                <!-- 已完成 -->
                <icon v-else-if="nodeItem.line.lineStatus == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="short-between-icon"></icon>
                <!-- 未完成 -->
                <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="short-between-icon"></icon>
              </template>
            </div>
            <div v-if="getLineNode(item.props, indexItem, dataItem.nodeList)" class="node nodeLine">
              <icon v-if="getLineNode(item.props, indexItem, dataItem.nodeList) && getLineNode(item.props, indexItem, dataItem.nodeList).lineStatus == 4" symbol name="iconchanpinzupaicheng_xuxian" class="step-between-icon"></icon>
              <icon v-else-if="getLineNode(item.props, indexItem, dataItem.nodeList) && getLineNode(item.props, indexItem, dataItem.nodeList).lineStatus == 2" symbol name="iconchanpinzupaicheng_jinhangzhong" class="step-between-icon"></icon>
              <!-- 已完成 -->
              <icon v-else-if="getLineNode(item.props, indexItem, dataItem.nodeList) && getLineNode(item.props, indexItem, dataItem.nodeList).lineStatus == 1" symbol name="iconchanpinzupaicheng_yiwancheng" class="step-between-icon"></icon>
              <!-- 未完成 -->
              <icon v-else symbol name="iconchanpinzupaicheng_weijinhang" class="step-between-icon"></icon>
              <span class="node-title"></span>
              <span class="node-week"></span>
            </div>
          </div>
        </div>
        <!---------------------------------------------------------------------->
        <!----------                  常规列                     ---------------->
        <!---------------------------------------------------------------------->
        <div v-else class="nomal-cell">{{dataItem[item.props]}}</div>
      </div>
    </div>
    <!---------------------------------------------------------------------->
    <!----------                  暂无数据                      ------------->
    <!---------------------------------------------------------------------->
    <div class="noData" v-if="tableData.length < 1">
      {{language('ZANWUSHUJU','暂无数据')}}
    </div>
  </div>
</template>

<script>
import { icon } from 'rise'
import moment from 'moment'
import { getTousandNum } from '@/utils/tool'
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
      getTousandNum
    }
  },
  methods: {
    /**
     * @Description: 跳转排程 
     * hasPartSchedule 是否有零件排程 1-是 0-否，如果有零件排程则跳转到零件排程页面，反之跳到产品组排程页面
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openAssistant(row) {
      let router = ''
      if (row.hasPartSchedule == 1) {
        router =  this.$router.resolve({path: '/projectscheassistant/partscheduling', query: { carProject: row.id, cartypeProjectZh: row.cartypeProjectZh }})
      } else {
        router =  this.$router.resolve({path: '/projectscheassistant/progroupscheduling', query: { carProject: row.id, cartypeProjectZh: row.cartypeProjectZh }})
      }
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 跳转监控
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openMonitoring(row) {
      const router =  this.$router.resolve({path: '/projectprogressmonitoring', query: { carProject: row.id, cartypeProjectZh: row.cartypeProjectZh }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 获取上一个最近节点状态
     * @Author: Luoshuang
     * @param {*} year
     * @param {*} season
     * @param {*} nodeList
     * @return {*}
     */    
    getLastStatus(year, season, nodeList) {
      const sameYearLastNode = nodeList.filter(item => item.year === year && item.season < season)
      if (sameYearLastNode.length > 0) {
        return sameYearLastNode[sameYearLastNode.length - 1].status
      }
      if (year === moment().year()) {
        return -1
      }
      const nodeListBeforeYear = nodeList.filter(item => item.year < year && item.year > moment().year() - 1)
      if (nodeListBeforeYear.length > 0) {
        return nodeListBeforeYear[nodeListBeforeYear.length - 1].status
      }
      return -1
    },
    /**
     * @Description: 获取下一个最近节点状态
     * @Author: Luoshuang
     * @param {*} year
     * @param {*} season
     * @param {*} nodeList
     * @return {*}
     */    
    getNextStatus(year, season, nodeList) {
      const sameYearNextNode = nodeList.filter(item => item.year === year && item.season > season)
      if (sameYearNextNode.length > 0) {
        return sameYearNextNode[0].status
      }
      if (year === moment().year() + 3) {
        return -1
      }
      const nodeListNextYear = nodeList.filter(item => item.year > year && item.year < moment().year() + 4)
      if (nodeListNextYear.length > 0) {
        return nodeListNextYear[0].status
      }
      return -1
    },
    getNextLineNodeStatus(year, season, nodeList) {
      if (year === moment().year() + 3 && season === 4) {
        return null
      }
      if (season === 4) {
        return this.getLineNode(year + 1, 1, nodeList)
      }
      return this.getLineNode(year, season + 1, nodeList)
    },
    /**
     * @Description: 获取连接线节点
     * @Author: Luoshuang
     * @param {*} year
     * @param {*} season
     * @param {*} nodeList
     * @return {*}
     */    
    getLineNode(year, season, nodeList) {
      if (!nodeList) {
        return null
      }
      if (this.getNodeList(year, season, nodeList).length > 0) {
        return null
      } else {
        const lastStatus = this.getLastStatus(year, season, nodeList)
        const nextStatus = this.getNextStatus(year, season, nodeList)
        if (nextStatus === -1) {
          return null
        }
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
            if (this.getNextLineNodeStatus(year, season, nodeList)) {
              return {
                lineStatus: 4
              }
            }
            return {
              lineStatus: 2
            }
          }
          return {
            lineStatus: 3
          }
        }
        return null
      }
    },
    getNextSeasonStatus(year, season, nodeList, currNode) {
      if (season == 4) {
        const nextNodeList = nodeList.filter(item => item.year === year + 1 && item.season == 1)
        if (nextNodeList.length > 0) {
          return nextNodeList[0].status
        }
      } else {
        const nextNodeList = nodeList.filter(item => item.year === year && (item.season == season && item.label !== currNode.label && item.week > currNode.week || item.season == season + 1))
        if (nextNodeList.length > 0) {
          return nextNodeList[0].status
        }
      }
      return -1
    },
    /**
     * @Description: 根据年份和季节获取节点列表
     * @Author: Luoshuang
     * @param {*} year
     * @param {*} season
     * @param {*} nodeList 原始节点列表
     * @return {*}
     */    
    getNodeList(year, season, nodeList) {
      if (!nodeList) {
        return []
      }
      return nodeList.filter(item => item.year === year && item.season === season).map(item => {
        const nextSeasonStatus = this.getNextSeasonStatus(year, season, nodeList, item)
        return {
          ...item,
          withLine: nextSeasonStatus != -1,
          line: {
            lineStatus: item.status === 2 || item.status === 3 ? 3 : nextSeasonStatus
          },
          week: item.week < 10 ? '0'+item.week:item.week
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
  position: relative;
  &-column {
    flex-shrink: 0;
    width: 136px;
    min-height: 400px;
    &:first-child {
      width: auto;
      min-width: 264px;
    }
    &:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5) {
      width: auto;
      min-width: 240px;
    }
    &:nth-child(8) {
      width: auto;
      min-width: 160px;
    }
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
        padding: 9px 0;
      }
      .nomal-cell {
        padding: 0 28px;
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
          ul, li {
            list-style: disc;
            margin-bottom: 5px;
            div {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              // margin-bottom: 5px;
            }
          }
          ol {
            display: flex;
            flex-direction: column;
            &:first-child {
              width: 30%;
            }
            &:last-child {
              width: 50%;
            }
            li {
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
          // flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          .node {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 10;
            .step-icon {
              width: 36px;
              height: 36px;
              background-color: white;
              border-radius: 50%;
            }
            &-title {
              font-size: 12px;
              font-weight: bold;
              margin-top: 25px;
            }
            &-week {
              font-size: 10px;
              color: rgba(95, 104, 121, 1);
              margin-top: 8px;
            }
            .short-between-icon {
              position: absolute;
              width: 18px;
              right: -20px;
              top: 12px;
            }
          }
          @for $i from 1 through 5 {
            .small-node#{$i} {
              position: absolute;
              // &:first-child {
              //   left: 0;
              // }
              // &:nth-child(2) {
              //   right: 0;
              // }
              .step-icon {
                // width: #{36/$i}px;
                // height: #{36/$i}px;
              }
              .node-title {
                font-size: 12px;
              }
              .node-week {
                font-size: 10px;
              }
              .short-between-icon {
                visibility: hidden;
              }
              &:last-child {
                .short-between-icon {
                  visibility:initial;
                  // width: 16px;
                  // right: -12px;
                  // top: 5px;
                }
              }
            }
          }
          .nodeLine {
            width: 100%;
            margin-bottom: 25px;
            .step-between-icon {
              width: 100%;
            }
          }
          .iconBox {
            height: 44%;
            width: 100%;
            display: flex;
            align-items: flex-end;
          }
          .textBox {
            width: 100%;
            height: 43%;
            // padding-top: 5px;
            z-index: 10;
            display: flex;
            flex-shrink: 0;
            .small-node1 {
              width: 50%;
              position: unset;
              .node-title {
                margin-top: 0;
              }
            }
            .small-node1 + .small-node1 {
              margin-left: 5px;
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
  .noData {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: #707070;
  }
  .overText{
    overflow: hidden;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 15px;
    line-height: 100%;
  }
}
</style>