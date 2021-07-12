<!--
 * @Author: your name
 * @Date: 2021-04-12 10:12:39
 * @LastEditTime: 2021-07-09 15:41:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\outputplan\index.vue
-->
<template>
  <iPage class="outputPlan">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('LK_PILIANGWEIHU','批量维护') }}：{{ params.partNum }}</span>
      <div class="floatright">
        <iButton @click="back">{{ language('LK_FANHUI','返回') }}</iButton>
        <logButton class="margin-left20" @click="log" />
        <span class="margin-left20">
					<icon symbol name="icondatabaseweixuanzhong" class="font18"></icon>
				</span>
      </div>
    </div>
    <outputPlan ref="outputPlan" :params="params" @updateStartYear="updateStartYear" />
    <outputRecord ref="outputRecord" class="margin-top20" :params="params" @updateOutput="updateOutput" />
    <volume class="margin-top20" :params="params" />
  </iPage>
</template>

<script>
import { iPage, iButton, icon } from '@/components'
import outputPlan from './components/outputPlan'
import outputRecord from './components/outputRecord'
import volume from './components/volume'
import logButton from '@/components/logButton'

export default {
  components: { iPage, iButton, icon, outputPlan, outputRecord, volume, logButton },
  data() {
    return {
      params: {}
    }
  },
  created() {
    this.params = this.$route.query
  },
  methods: {
    updateStartYear(startYear) {
      this.$refs.outputRecord.updateStartYear(startYear)
    },
    updateOutput(data) {
      this.$refs.outputPlan.updateOutput(data)
    },
    log() {
      window.open(`/#/log?recordId=`, '_blank')
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
}
</style>