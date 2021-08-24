<!--
 * @Author: haojiang
 * @Date: 2021-08-24 15:19:33
 * @LastEditTime: 2021-08-24 16:34:50
 * @LastEditors: Please set LastEditors
 * @Description: 风险预警配置
 * @FilePath: /front-web/src/views/project/progressmonitoring/riskAndAlarmConfig/index.vue
-->
<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("FENGXIANYUJINGPEIZHI",'风险预警配置')}}</span>
      <div class="floatright">
        <iButton>
          {{ language("LK_BAOCUNBINGYINGYONG",'保存并应用') }}
        </iButton>
      </div>
    </div>
    <div class="table">
      <tableList
        index
        :tableData="riskAndAlarmData"
        :tableTitle="riskAndAlarmTitle"
        :lang="true"
      >
        <!-- 颜色 -->
        <template #icon="scope">
          <icon symbol :name="scope.row.icon" class="icon" />
        </template>
        <!-- 延误时间（周） -->
        <template #delayTime="scope">
          <span v-if="scope.row.crossOver[0]">[</span>
          <span v-else>(</span>
          <iInput v-model="scope.row.min" style="width: 100px;padding: 0 10px" />
          <span class="split">,</span>
          <iInput v-model="scope.row.max" style="width: 100px;padding: 0 10px" />
          <span v-if="scope.row.crossOver[1]">]</span>
          <span v-else>)</span>
        </template>
      </tableList>
    </div>
  </iCard>
</template>
<script>
import { iCard, iButton, icon, iInput} from 'rise'
import {riskAndAlarmTitle, riskAndAlarmData} from '../data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'

export default {
  components: { iCard, iButton, icon, iInput, tableList },
  data() {
    return {
      form: {},
      selectOptions: {},
      riskAndAlarmTitle,
      riskAndAlarmData
    }
  },
  methods: {

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