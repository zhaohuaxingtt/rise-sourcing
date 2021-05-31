<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 13:35:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-29 16:27:27
 * @Description: 定点管理-决策资料-RS
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\rs\index.vue
-->

<template>
  <circulation v-if="isCirculation" :isPreview="isPreview" />
  <meeting v-else :isPreview="isPreview" />
</template>

<script>
import meeting from './components/meeting'
import circulation from './components/circulation'
export default {
  components: { meeting, circulation },
  props: {
    otherPreview: {type: Boolean, default: false},
    otherNominationType: {type:String}
  },
  data() {
    return {}
  },
  computed: {
    isCirculation(){
      return this.$store.getters.nominationType == '2' || (this.otherPreview && this.otherNominationType == '2');
    },
    isPreview() {
      return this.$store.getters.isPreview || this.otherPreview
    }
  }
}
</script>

<style lang="scss" scoped>

</style>