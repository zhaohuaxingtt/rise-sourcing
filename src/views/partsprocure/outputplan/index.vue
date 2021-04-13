<template>
  <iPage class="outputPlan">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_PILIANGWEIHU') }}：{{ params.partNum }}</span>
      <div class="floatright">
        <iButton @click="back">{{ $t('LK_FANHUI') }}</iButton>
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
import logButton from '@/views/partsign/editordetail/components/logButton'

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