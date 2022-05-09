<!--
 * @Author: your name
 * @Date: 2021-08-06 17:05:28
 * @LastEditTime: 2021-08-31 14:33:57
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: /front-web/src/views/dashboard/report/components/rfqList/index.vue
-->
<template>
  <div class="rfq-list">
    <div class="rfq-list-item" v-for="(item, index) in data" :key="index">
      <div class="rfq-title">
        <span class="tit" @click="$router.push({path: `/sourceinquirypoint/sourcing/partsrfq/assistant?id=${item.rfqId}`})">{{item.rfqId || ''}}</span>
        <div class="alarm">
          <span class="margin-right20">{{language('RENWUJINDU','任务进度')}}:
            <icon symbol style="font-size:14px;position:relative;top:2px;" :color='"#eff9fd"' :name="iconList_all_times['a'+(item.wholeTaskProgress||6)].icon"></icon>
            </span>
          <span>{{language('ZHENGCHEJINDUFENGXIAN','整车进度风险')}}: 
            <icon symbol style="font-size:20px;position:relative;top:2px;" :name="iconList_car['a'+(item.wholeProgressRisk||1)].icon"></icon>
          </span>
        </div>
      </div>
      <div class="rfq-body">
        <div class="timeLine">
          <timeLine :timeList='item.timeListData || timeListdata' />
        </div>
        <div class="comments">
          <iInput 
            type="textarea"
            :rows="3"
            resize="none"
            :placeholder="language('LK_QINGSHURUBEIZHU','请输入备注')"
            @change="updateOverviewRemark(item)"
            v-model="item.remark">
          </iInput>
        </div>
      </div>
    </div>
    <div class="data-null" v-if="!(data && data.length)">
      {{$t('LK_ZANWUSHUJU')}}
    </div>
  </div>
</template>

<script>
import {iInput,icon,iMessage} from 'rise'
import {
  timeList,
  iconList_car,
  iconList_all_times
} from './components/data'
import timeLine from './components/timeline'
import {overviewRemark} from '@/api/dashboard'
import _ from 'lodash'

export default {
  props: {
    dataList: {
      type: Array,
      default: () => ([])
    }
  },
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
  watch: {
    dataList(data) {
      this.init(data)
    }
  },
  // created() {
  //   this.init(this.data)
  // },
  methods: {
    init(dataList = []) {
      const data = _.cloneDeep(dataList)
      // data = require('./components/moke.json')
      if (!dataList.length) {
        this.data = []
        return
      }
      data.map(o => {
        const rfqTimeAxisProgressVOList = []
        const timeListData = _.cloneDeep(timeList)
        timeListData.forEach(item => {
          // 初始化节点
          let params = {
            progressTypeDesc: item.name,
            key: item.key,
            name: item.name,
            long: item.long
          }
          // 获取节点状态信息
          Object.keys(item.query).forEach(key => {
            const targetKey = item.query[key]
            const targetValue = o[targetKey] || ''
            params[key] = targetValue
          })
          params = Object.assign(params, {
            // 任务是否正常完成（非没开始的任务）
            active: params.taskStatus !== 5,
            // 超期未完成
            delay: params.taskStatus === 3
          })
          rfqTimeAxisProgressVOList.push(params)
        })
        o.timeListData = rfqTimeAxisProgressVOList
        return o
      })
      console.log('mokeData', data)
      this.data = data
    },
    // 更新备注
    updateOverviewRemark: _.debounce(async function(item) {
      try {
        const res = await overviewRemark({
          rfqId: item.rfqId,
          remark: item.remark
        })
        if (res.code !== '200') {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        e && (iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn))
      }
    }, 500)
  }

}
</script>
<style lang="scss" scoped>
.rfq-list {
  box-sizing: border-box;
  padding: 1.875rem 2.5rem;
  height: 820px;
  overflow-x: hidden;
  overflow-y: scroll;
  .rfq-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tit {
      text-decoration: underline;
      font-size: 20px;
      color: #2c2c2c;
      display: inline-block;
      cursor: pointer;
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
.data-null {
  min-height: 300px;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>