<template>
  <div>
    <span v-if="row.itemSource == 3 && row.nominationStatus == '0' && row.status == '1'" class="openLinkText cursor" @click="openRisePage(row)">
    {{ row["riseCode"] }}
    </span>
    <span v-else>{{ row.riseCode }}</span>
  </div>
</template>

<script>
export default {
  props: {
    row: { type: Object, require: true },
  },
  methods: {
     //点击rise编号
    openRisePage(val) {
      let routeData = this.$router.resolve({
        path: '/purchaserequisition/newapplication',
        query: { code: val.riseCode, subType: val.subType }
      })
      window.open(routeData.href, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
}
</style>