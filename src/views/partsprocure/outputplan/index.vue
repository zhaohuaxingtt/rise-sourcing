<template>
  <iPage class="outputPlan">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">批量维护：3QG820005L</span>
      <div class="floatright">
        <span>
					<icon symbol symbol name="icondatabaseweixuanzhong" class="font18"></icon>
				</span>
      </div>
    </div>
    <outputPlan />
    <outputRecord class="margin-top20" />
    <usage class="margin-top20" />
  </iPage>
</template>

<script>
import { iPage, icon } from '@/components'
import outputPlan from './components/outputPlan'
import outputRecord from './components/outputRecord'
import usage from './components/usage'

export default {
  components: { iPage, icon, outputPlan, outputRecord, usage }
}
</script>

<style lang="scss" scoped>

</style>