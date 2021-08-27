<!--
 * @Author: haojiang
 * @Date: 2021-08-24 15:19:33
 * @LastEditTime: 2021-08-26 16:04:35
 * @LastEditors: Please set LastEditors
 * @Description: 风险预警配置
 * @FilePath: /front-web/src/views/project/progressmonitoring/riskAndAlarmConfig/index.vue
-->
<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("FENGXIANYUJINGPEIZHI",'风险预警配置')}}</span>
      <div class="floatright">
        <iButton :loading="submitting" @click="save">
          {{ language("LK_BAOCUNBINGYINGYONG",'保存并应用') }}
        </iButton>
      </div>
    </div>
    <div class="table">
      <tableList
        index
        :tableData="data"
        :tableTitle="riskAndAlarmTitle"
        :tableLoading="tableLoading"
        :lang="true"
      >
        <!-- 风险状态 -->
        <template #level="scope">
          {{language(scope.row.key, scope.row.level)}}
        </template>
        <!-- 颜色 -->
        <template #icon="scope">
          <icon symbol :name="scope.row.icon" class="icon" />
        </template>
        <!-- 延误时间（周） -->
        <template #delayTime="scope">
          <span v-if="scope.row.crossOver[0]">[</span>
          <span v-else>(</span>
          <iInput v-model="scope.row.delayWeekLeft" style="width: 100px;padding: 0 10px" />
          <span class="split">,</span>
          <iInput v-model="scope.row.delayWeekRight" style="width: 100px;padding: 0 10px" />
          <span v-if="scope.row.crossOver[1]">]</span>
          <span v-else>)</span>
        </template>
      </tableList>
    </div>
  </iCard>
</template>
<script>
import { iCard, iButton, icon, iInput, iMessage} from 'rise'
import {riskAndAlarmTitle, riskAndAlarmData} from '../data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { 
  getDelayGradeConfig,
  saveDelayGradeConfig
} from '@/api/project/process'

export default {
  components: { iCard, iButton, icon, iInput, tableList },
  data() {
    return {
      form: {},
      tableLoading: false,
      submitting: false,
      selectOptions: {},
      riskAndAlarmTitle,
      riskAndAlarmData,
      data: [],
      finger: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.tableLoading = true
      getDelayGradeConfig({}).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const finger = []
          const tableListData = res.data || []
          this.data = tableListData.map(o => {
            const tar = this.riskAndAlarmData.find(item => item.delayLevel === o.delayLevel)
            if (tar) {
              o.key = tar.key
              o.crossOver = tar.crossOver
              o.icon = tar.icon
              o.level = tar.level
            }
            finger.push(o.delayWeekLeft)
            finger.push(o.delayWeekRight)
            return o
          })
          this.finger = finger.join(',')
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.tableLoading = false
      })
    },
    validate(data = []) {
      let state = true
      let errorInfo = ''
      let sortArray = []
      data.forEach((item, index) => {
        const min = item.delayWeekLeft
        const max = item.delayWeekRight
        // 校验同行内的校验
        if (state && (min >= max)) {
          state = false
          errorInfo = `${this.language('FENGXIANDENGJI','风险等级')}[${this.language(item.key,item.level)}],${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
        }
        sortArray.push(min)
        sortArray.push(max)
      })
      sortArray = sortArray.map(o => Number(o))
      const unsortString = sortArray.join(',')
      const sortString = sortArray.sort((a,b) => a-b).join(',')
      // 顺序有错误
      if (state && sortString !== unsortString) {
        state = false
        errorInfo = `${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
      }
      // 配置有交集
      if (state && sortArray.length !== window._.uniq(sortArray).length) {
        state = false
        errorInfo = `${this.language('PEIZHIBUHEFAXIUGCHONGSHI','配置不合法，请修改后重试')}`
      }

      // 配置没发生变化
      if (state && sortString === this.finger) {
        state = false
        errorInfo = `${this.language('UNCHANGEDCONFIGWARNING','配置没有发生变化，不需要保存')}`
      }
      console.log('配置',sortString, unsortString,sortArray)
      return {
        state,
        errorInfo
      }
    },
    save() {
      const tableListData = window._.cloneDeep(this.data)
      // 检查合法性
      const validate = this.validate(tableListData)
      if (!validate.state) {
        iMessage.error(validate.errorInfo)
        return
      }
      const params = tableListData.map(o => {
        o.delayWeekLeft = Number(o.delayWeekLeft)
        o.delayWeekRight = Number(o.delayWeekRight)
        delete o.crossOver
        delete o.icon
        delete o.level
        delete o.key
        return o
      })
      this.submitting = true
      saveDelayGradeConfig(params).then(res => {
        this.submitting = false
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.init()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.submitting = false
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.table {
  ::v-deep.icon {
    font-size: 24px;
  }
}
</style>