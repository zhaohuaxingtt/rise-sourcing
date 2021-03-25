<template>
  <iPage class="outputPlan">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">批量维护：3QG820005L</span>
      <div class="floatright">
        <logButton @click="log" />
        <span class="margin-left20">
					<icon symbol name="icondatabaseweixuanzhong" class="font18"></icon>
				</span>
      </div>
    </div>
    <outputPlan @updateStartYear="updateStartYear" />
    <outputRecord ref="outputRecord" class="margin-top20" />
    <volume class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage, icon } from '@/components'
import outputPlan from './components/outputPlan'
import outputRecord from './components/outputRecord'
import volume from './components/volume'
import logButton from '@/views/partsign/editordetail/components/logButton'

export default {
  components: { iPage, icon, outputPlan, outputRecord, volume, logButton },
  methods: {
    updateStartYear(startYear) {
      this.$refs.outputRecord.updateStartYear(startYear)
    },
    log() {
      window.open(`/#/log?recordId=`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.outputPlan {
}
</style>