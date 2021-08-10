<!--
 * @Author: your name
 * @Date: 2021-08-06 17:05:28
 * @LastEditTime: 2021-08-09 15:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/dashboard/report/components/rfqList/index.vue
-->
<template>
  <div class="rfq-list">
    <div class="rfq-list-item" v-for="(item, index) in data" :key="index">
      <div class="rfq-title">
        <span class="tit">{{item.rfqId || ''}}</span>
        <div class="alarm">
          <span class="margin-right20">{{language('ZHENGTIRENWUJINDU','整体任务进度')}}:
            <icon symbol style="font-size:14px;position:relative;top:2px;" :color='"#eff9fd"' :name="iconList_all_times['a'+item.wholeTaskProgress].icon"></icon>
            </span>
          <span>{{language('ZHENGCHEJINDUFENGXIAN','整车进度风险')}}: <el-tooltip placement="right" effect="light">
            <icon symbol style="font-size:20px;position:relative;top:2px;" :name="iconList_car['a'+item.wholeProgressRisk].icon"></icon>
              <!-- <template slot='content'>
                <dalyWeeks :daliyTime='daliyTime'></dalyWeeks>
              </template> -->
            </el-tooltip>
          </span>
        </div>
      </div>
      <div class="rfq-body">
        <div class="timeLine">
          <timeLine :timeList='item.timeListdata || timeListdata' />
        </div>
        <div class="comments">
          <iInput 
            type="textarea"
            :rows="3"
            resize="none"
            :placeholder="language('LK_QINGSHURUBEIZHU','请输入备注')"
            v-model="mark">
          </iInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {iInput,icon} from 'rise'
import {
  timeList,
  iconList_car,
  iconList_all_times
} from './components/data'
import timeLine from './components/timeline'
import _ from 'lodash'

export default {
  components: {
    iInput,
    icon,
    timeLine
  },
  data() {
    return {
      timeListdata: timeList,
      iconList_car,
      iconList_all_times,
      data: [],
      mark: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const mokeData = require('./components/moke.json')
      mokeData.map(o => {
        const processList = o.rfqTimeAxisProgressVOList || []
        const timeListData = _.cloneDeep(timeList)
        timeListData.map(item => {
          // 校验是否有delay
          const processStepItem = processList.find(p => p.progressTypeDesc === item.name) || ''
          if (processStepItem) {
            item.active = true
            item.doneYear = processStepItem.doneYear || ''
            item.doneWeek = processStepItem.doneWeek || ''
            item.delay = (processStepItem.doneWeek > item.week)
            return item
          }
          
        })
        o.timeListdata = timeListData
        return o
      })
      console.log('mokeData', mokeData)
      this.data = mokeData
    },
  }

}
</script>
<style lang="scss" scoped>
.rfq-list {
  .rfq-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tit {
      text-decoration: underline;
      font-size: 20px;
      color: #2c2c2c;
    }
  }
  .rfq-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    .timeLine {
      width: 80%;
      box-sizing: border-box;
      padding-right: 20px;
      &::-webkit-scrollbar {
        width: 0px !important;
      }
      &::-webkit-scrollbar-thumb {
        display: none;
      }
      &::-webkit-scrollbar-track {
        display: none;
      }
      ::-webkit-scrollbar-corner {
        background-color: rgb(182, 170, 170);
      }
      ::v-deep.timeLine {
        padding-top: 10px !important;
        width: 100% !important;
      }
    }
    .comments {
      width: 20%;
      padding-top: 30px;
    }
  }
  .rfq-list-item {
    border-bottom: 1px dashed #CDD4E2;
    padding-top: 20px;
    &:last-child {
      border-bottom: 0px;
    }
  }
}
</style>